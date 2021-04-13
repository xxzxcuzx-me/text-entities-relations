/* eslint-disable @typescript-eslint/no-explicit-any */
import { SentenceCreator } from "./SentenceCreator.service";
import { Chunk } from "../Models/Chunk";
import { XMLChunk } from "../Constants";
import { Service } from "typedi";

@Service()
export class ChunkCreator {
  private chunkGlobalCounter = 0;
  constructor(private sentenceCreator: SentenceCreator) {}

  public createChunk(chunk: XMLChunk): Chunk {
    const newChunk: Chunk = {
      chunkIndex: this.chunkGlobalCounter,
      sentences: [],
    };
    this.chunkGlobalCounter++;
    let sentenceInChunkCounter = 0;
    if (chunk.sentence) {
      for (const sentence of chunk.sentence) {
        const newSentence = this.sentenceCreator.createSentence(
          sentenceInChunkCounter,
          sentence
        );
        newChunk.sentences.push(newSentence);
        sentenceInChunkCounter++;
      }
    }
    return newChunk;
  }

  public reset(): void {
    this.chunkGlobalCounter = 0;
    this.sentenceCreator.reset();
  }
}
