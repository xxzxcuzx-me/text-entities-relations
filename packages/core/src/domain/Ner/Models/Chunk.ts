import { Sentence } from "./Sentence";

export interface Chunk {
  sentences: Array<Sentence>;
  chunkIndex: number;
}
