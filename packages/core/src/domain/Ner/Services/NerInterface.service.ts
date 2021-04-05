import Container, { Service } from "typedi";
import { SimpleEventDispatcher, ISimpleEvent } from "strongly-typed-events";
import { ChunkList } from "../Models/ChunkList";
import { Chunk } from "../Models/Chunk";
import { Sentence } from "../Models/Sentence";
import { Token } from "../Models/Token";
import { TokenType } from "../Models/TokenType";

import axios, { AxiosError } from "axios";
import xml2js from "xml2js";

enum APIUrls {
  UPLOAD = "upload/",
  START = "startTask/",
  RESULT = "download",
  STATUS = "getStatus/",
}

enum LPMNValues {
  NER_PL = 'any2txt|spacy({"method":"ner","lang":"pl"})',
  NER_EN = 'any2txt|spacy({"method":"ner","lang":"en"})',
  NER_DE = 'any2txt|spacy({"method":"ner","lang":"de"})',
  NER_ES = 'any2txt|spacy({"method":"ner","lang":"es"})',
  NER_RU = 'any2txt|spacy({"method":"ner","lang":"ru"})',
}

enum status {
  PROCESSING = "PROCESSING",
  DONE = "DONE",
  ERROR = "ERROR",
}

/**
 * Responsible for sending and obtaining results of NER processing.
 * Fetches and emits progress events.
 */
@Service()
export class NerInterfaceService {
  private result: ChunkList = [];
  private baseURL = "https://ws.clarin-pl.eu/nlprest2/base/";
  private fileHandle!: string;
  private taskHandle!: string;
  private resultHandle!: string;
  private user = "Grupa D";
  private interval = 1000;
  private sentenceGlobalCounter = 0;
  private wordGlobalCounter = 0;
  private LPMN = LPMNValues.NER_PL;
  private _onProgress = new SimpleEventDispatcher<number>();
  private _onSuccess = new SimpleEventDispatcher<ChunkList>();
  get onProgress(): ISimpleEvent<number> {
    return this._onProgress.asEvent();
  }

  get onSuccess(): ISimpleEvent<ChunkList> {
    return this._onSuccess.asEvent();
  }

  static get(): NerInterfaceService {
    return Container.get(NerInterfaceService);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public processFile(file: Buffer) {
    const URL = this.baseURL + APIUrls.UPLOAD;
    const headers = {
      headers: {
        "Content-Type": "application/octet-stream",
      },
    };
    return new Promise((resolve, reject) => {
      axios.post(URL, file, headers).then(
        async (response) => {
          this.fileHandle = response.data;
          await this.startTask();
          resolve(null);
        },
        (error) => {
          this.handleError(error);
          reject(null);
        }
      );
    });
  }

  private startTask() {
    const URL = this.baseURL + APIUrls.START;
    const data = {
      lpmn: "filezip(" + this.fileHandle + ")|" + this.LPMN,
      user: this.user,
    };
    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    return new Promise((resolve, reject) => {
      axios.post(URL, data, headers).then(
        async (response) => {
          this.taskHandle = response.data;
          await this.observeTask();
          resolve(null);
        },
        (error) => {
          this.handleError(error);
          reject(null);
        }
      );
    });
  }

  private timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private observeTask() {
    const URL = this.baseURL + APIUrls.STATUS + this.taskHandle;
    return new Promise((resolve, reject) => {
      axios.get(URL).then(
        async (response) => {
          const data = response.data;
          if (data.status === status.PROCESSING) {
            this._onProgress.dispatch(data.value);
            await this.timeout(this.interval);
            await this.observeTask();
          } else if (data.status === status.DONE) {
            this._onProgress.dispatch(1);
            for (const resultFile of data.value) {
              this.resultHandle = resultFile["fileID"];
              await this.processResult();
            }
            this._onSuccess.dispatch(this.result);
          } else if (data.status === status.ERROR) {
            reject(null);
          }
          resolve(null);
        },
        (error) => {
          this.handleError(error);
          reject(null);
        }
      );
    });
  }

  private processResult() {
    const URL = this.baseURL + APIUrls.RESULT + this.resultHandle;
    return new Promise((resolve, reject) => {
      axios.get(URL).then(
        (response) => {
          const NERData = response.data;
          this.createChunkList(NERData);
          resolve(null);
        },
        (error) => {
          this.handleError(error);
          reject(null);
        }
      );
    });
  }

  private createChunkList(NERData: string) {
    const parser = new xml2js.Parser();
    parser.parseString(NERData, (err: any, result: any) => {
      let chunkCounter = 0;
      if (result.chunkList.chunk) {
        for (const chunk of result.chunkList.chunk) {
          this.createChunk(chunkCounter, chunk);
          chunkCounter++;
        }
      }
    });
  }

  private createChunk(chunkCounter: number, chunk: any) {
    const newChunk: Chunk = {
      chunkIndex: chunkCounter,
      sentences: [],
    };
    let sentenceCounter = 0;
    if (chunk.sentence) {
      for (const sentence of chunk.sentence) {
        this.createSentence(sentenceCounter, newChunk, sentence);
        sentenceCounter++;
      }
    }
    this.result.push(newChunk);
  }

  private createSentence(sentenceCounter: number, chunk: Chunk, sentence: any) {
    const newSentence: Sentence = {
      sentenceIndex: sentenceCounter,
      sentenceGlobalIndex: this.sentenceGlobalCounter,
      tokens: [],
    };
    let wordCounter = 0;
    let lastAnnotation = "0";
    if (sentence.tok) {
      for (const token of sentence.tok) {
        lastAnnotation = this.createToken(
          wordCounter,
          newSentence,
          lastAnnotation,
          token
        );
        wordCounter++;
        this.wordGlobalCounter++;
      }
    }
    chunk.sentences.push(newSentence);
    this.sentenceGlobalCounter++;
  }

  private createToken(
    wordCounter: number,
    sentence: Sentence,
    lastAnnotation: string,
    token: any
  ): string {
    if (token.hasOwnProperty("ann")) {
      for (const annotation of token.ann) {
        if (annotation._ !== "0") {
          const type = this.getTokenType(annotation.$.chan);
          const name = token.lex[0].base[0];
          const lastToken = sentence.tokens.slice(-1)[0];
          if (
            lastToken &&
            annotation._ === lastAnnotation &&
            type === lastToken.type
          ) {
            const lastToken = sentence.tokens.pop() as Token;
            lastToken.name = lastToken.name + " " + name;
            sentence.tokens.push(lastToken);
          } else {
            const newToken: Token = {
              tokenIndex: wordCounter,
              tokenGlobalIndex: this.wordGlobalCounter,
              name: name,
              type: type,
            };
            sentence.tokens.push(newToken);
          }
          return annotation._;
        }
      }
    }
    return "0";
  }

  private handleError(error: AxiosError) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  }

  private getTokenType(type: string): TokenType {
    if (type === TokenType.LOCATION) return TokenType.LOCATION;
    else if (type === TokenType.PLACE) return TokenType.PLACE;
    else return TokenType.PERSON;
  }
}
