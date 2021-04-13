import xml2js from "xml2js";
import { ChunkCreator } from "./ChunkCreator.service";
import { ChunkList } from "../Models/ChunkList";
import { XML } from "../Constants";
import { Service } from "typedi";

@Service()
export class ChunkListCreator {
  constructor(private chunkCreator: ChunkCreator) {}

  public createChunkList(NERData: string): ChunkList {
    const parser = new xml2js.Parser();
    const chunkList: ChunkList = [];
    parser.parseString(NERData, (err: string, result: XML) => {
      if (result.chunkList.chunk) {
        for (const chunk of result.chunkList.chunk) {
          const newChunk = this.chunkCreator.createChunk(chunk);
          chunkList.push(newChunk);
        }
      }
    });
    return chunkList;
  }

  public reset(): void {
    this.chunkCreator.reset();
  }
}
