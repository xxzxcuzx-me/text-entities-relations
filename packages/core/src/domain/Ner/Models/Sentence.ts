import { Token } from "./Token";

export interface Sentence {
  tokens: Array<Token>;
  sentenceIndex: number;
  sentenceGlobalIndex: number;
}
