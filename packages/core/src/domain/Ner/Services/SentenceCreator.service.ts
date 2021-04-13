import { TokenCreator } from "./TokenCreator.service";
import { Sentence } from "../Models/Sentence";
import { XMLSentence } from "../Constants";
import { Service } from "typedi";

@Service()
export class SentenceCreator {
  private sentenceGlobalCounter = 0;

  constructor(private tokenCreator: TokenCreator) {}

  public createSentence(
    sentenceCounter: number,
    sentence: XMLSentence
  ): Sentence {
    const newSentence: Sentence = {
      sentenceIndex: sentenceCounter,
      sentenceGlobalIndex: this.sentenceGlobalCounter,
      tokens: [],
    };
    this.sentenceGlobalCounter++;
    let tokenInSentenceCounter = 0;
    let lastAnnotation = "0";
    if (sentence.tok) {
      for (const token of sentence.tok) {
        lastAnnotation = this.tokenCreator.createToken(
          tokenInSentenceCounter,
          newSentence,
          lastAnnotation,
          token
        );
        tokenInSentenceCounter++;
      }
    }
    return newSentence;
  }

  public reset(): void {
    this.sentenceGlobalCounter = 0;
    this.tokenCreator.reset();
  }
}
