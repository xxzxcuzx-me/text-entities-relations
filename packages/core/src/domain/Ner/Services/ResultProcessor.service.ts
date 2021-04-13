import { APIUrls, baseURL } from "../Constants";
import axios from "axios";
import { ChunkListCreator } from "./ChunkListCreator.service";
import { ChunkList } from "../Models/ChunkList";
import { Service } from "typedi";
import { NEREventDispatcher } from "./NEREventDispatcher.service";

@Service()
export class ResultProcessor {
  constructor(
    private chunkListCreator: ChunkListCreator,
    private eventDispatcher: NEREventDispatcher
  ) {}

  public processResult(resultHandle: string): Promise<ChunkList> {
    const URL = baseURL + APIUrls.RESULT + resultHandle;
    return new Promise((resolve, reject) => {
      axios.get(URL).then(
        (response) => {
          const NERData = response.data;
          const result = this.chunkListCreator.createChunkList(NERData);
          resolve(result);
        },
        () => {
          this.eventDispatcher.dispatchError(
            "Error while fetching result data"
          );
          reject(null);
        }
      );
    });
  }

  public reset(): void {
    this.chunkListCreator.reset();
  }
}
