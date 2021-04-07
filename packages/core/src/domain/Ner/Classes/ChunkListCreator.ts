import xml2js from "xml2js";
import { ChunkCreator } from "./ChunkCreator";
import { ChunkList } from "../Models/ChunkList";
import { XML } from "../Constants";

export class ChunkListCreator {
  private chunkCreator = new ChunkCreator();

  public createChunkList(NERData: string): ChunkList {
    const parser = new xml2js.Parser();
    const chunkList: ChunkList = [];
    parser.parseString(NERData, (err: string, result: XML) => {
      let chunkCounter = 0;
      if (result.chunkList.chunk) {
        for (const chunk of result.chunkList.chunk) {
          const newChunk = this.chunkCreator.createChunk(chunkCounter, chunk);
          chunkList.push(newChunk);
          chunkCounter++;
        }
      }
    });
    return chunkList;
  }
}
