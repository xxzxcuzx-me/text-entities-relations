import { APIUrls, baseURL } from "../Constants";
import axios from "axios";
import { SimpleEventDispatcher } from "strongly-typed-events";
import { ChunkListCreator } from "./ChunkListCreator";
import { ChunkList } from "../Models/ChunkList";

export class ResultProcessor {
  private _onError: SimpleEventDispatcher<string>;
  private chunkListCreator = new ChunkListCreator();

  constructor(_onError: SimpleEventDispatcher<string>) {
    this._onError = _onError;
  }

  public processResult(resultHandle: string): Promise<ChunkList> {
    const URL = baseURL + APIUrls.RESULT + resultHandle;
    return new Promise((resolve, reject) => {
      axios.get(URL).then(
        (response) => {
          this.chunkListCreator = new ChunkListCreator();
          const NERData = response.data;
          const result = this.chunkListCreator.createChunkList(NERData);
          resolve(result);
        },
        () => {
          this._onError.dispatch("Error while fetching result data");
          reject(null);
        }
      );
    });
  }
}
