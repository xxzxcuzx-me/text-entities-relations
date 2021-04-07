import { TokenCreator } from "./TokenCreator";
import { Sentence } from "../Models/Sentence";
import { XMLSentence } from "../Constants";

export class SentenceCreator {
  private tokenCreator = new TokenCreator();
  private sentenceGlobalCounter = 0;

  public createSentence(
    sentenceCounter: number,
    sentence: XMLSentence
  ): Sentence {
    const newSentence: Sentence = {
      sentenceIndex: sentenceCounter,
      sentenceGlobalIndex: this.sentenceGlobalCounter,
      tokens: [],
    };
    let wordCounter = 0;
    let lastAnnotation = "0";
    if (sentence.tok) {
      for (const token of sentence.tok) {
        lastAnnotation = this.tokenCreator.createToken(
          wordCounter,
          newSentence,
          lastAnnotation,
          token
        );
        wordCounter++;
      }
    }
    this.sentenceGlobalCounter++;
    return newSentence;
  }
}
