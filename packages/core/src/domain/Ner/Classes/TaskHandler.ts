import { APIUrls, baseURL } from "../Constants";
import axios from "axios";
import { SimpleEventDispatcher, ISimpleEvent } from "strongly-typed-events";
import { TaskObserver } from "./TaskObserver";
import { ChunkList } from "../Models/ChunkList";

export class TaskHandler {
  private headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  private _onError: SimpleEventDispatcher<string>;
  private user = "Grupa D";
  private taskObserver: TaskObserver;

  constructor(_onError: SimpleEventDispatcher<string>) {
    this._onError = _onError;
    this.taskObserver = new TaskObserver(_onError);
  }

  get onProgress(): ISimpleEvent<number> {
    return this.taskObserver.onProgress;
  }

  get onSuccess(): ISimpleEvent<ChunkList> {
    return this.taskObserver.onSuccess;
  }

  public startTaskArchive(fileHandle: string, language: string): Promise<null> {
    const data = {
      lpmn: this.getLPMNForLanguageArchive(fileHandle, language),
      user: this.user,
    };
    return this.sendRequest(data);
  }

  public startTaskDocument(
    fileHandle: string,
    language: string
  ): Promise<null> {
    const data = {
      lpmn: this.getLPMNForLanguage(language),
      file: fileHandle,
      user: this.user,
    };
    return this.sendRequest(data);
  }

  private sendRequest(data: Record<string, unknown>): Promise<null> {
    const URL = baseURL + APIUrls.START;
    return new Promise((resolve, reject) => {
      axios.post(URL, data, this.headers).then(
        async (response) => {
          const taskHandle = response.data;
          await this.taskObserver.observeTask(taskHandle);
          resolve(null);
        },
        () => {
          this._onError.dispatch("Error while starting task");
          reject(null);
        }
      );
    });
  }

  private getLPMNForLanguage(language: string): string {
    return 'any2txt|spacy({"method":"ner","lang":"' + language + '"})';
  }

  private getLPMNForLanguageArchive(
    fileHandle: string,
    language: string
  ): string {
    return "filezip(" + fileHandle + ")|" + this.getLPMNForLanguage(language);
  }
}
