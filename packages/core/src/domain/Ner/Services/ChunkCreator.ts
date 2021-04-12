/* eslint-disable @typescript-eslint/no-explicit-any */
import { SentenceCreator } from "./SentenceCreator";
import { Chunk } from "../Models/Chunk";
import { XMLChunk } from "../Constants";
import { Service } from "typedi";

@Service()
export class ChunkCreator {
  constructor(private sentenceCreator: SentenceCreator) {}

  public createChunk(chunkCounter: number, chunk: XMLChunk): Chunk {
    const newChunk: Chunk = {
      chunkIndex: chunkCounter,
      sentences: [],
    };
    let sentenceCounter = 0;
    if (chunk.sentence) {
      for (const sentence of chunk.sentence) {
        const newSentence = this.sentenceCreator.createSentence(
          sentenceCounter,
          sentence
        );
        newChunk.sentences.push(newSentence);
        sentenceCounter++;
      }
    }
    return newChunk;
  }

  public reset(): void {
    this.sentenceCreator.reset();
  }
}
