import { APIUrls, baseURL, Status } from "../Constants";
import axios from "axios";
import { SimpleEventDispatcher, ISimpleEvent } from "strongly-typed-events";
import { ChunkList } from "../Models/ChunkList";
import { ResultProcessor } from "./ResultProcessor";

export class TaskObserver {
  private _onError: SimpleEventDispatcher<string>;
  private _onSuccess = new SimpleEventDispatcher<ChunkList>();
  private _onProgress = new SimpleEventDispatcher<number>();
  private interval = 1000;
  private resultProcessor: ResultProcessor;

  constructor(_onError: SimpleEventDispatcher<string>) {
    this._onError = _onError;
    this.resultProcessor = new ResultProcessor(_onError);
  }

  get onProgress(): ISimpleEvent<number> {
    return this._onProgress.asEvent();
  }

  get onSuccess(): ISimpleEvent<ChunkList> {
    return this._onSuccess.asEvent();
  }

  private timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public observeTask(taskHandle: string): Promise<null> {
    const URL = baseURL + APIUrls.STATUS + taskHandle;
    return new Promise((resolve, reject) => {
      axios.get(URL).then(
        async (response) => {
          const data = response.data;
          if (data.status === Status.PROCESSING) {
            this._onProgress.dispatch(data.value);
            await this.timeout(this.interval);
            await this.observeTask(taskHandle);
          } else if (data.status === Status.DONE) {
            this._onProgress.dispatch(1);
            let result: ChunkList = [];
            for (const resultFile of data.value) {
              const resultHandle = resultFile["fileID"];
              result = await this.resultProcessor.processResult(resultHandle);
            }
            this._onSuccess.dispatch(result);
          } else if (data.status === Status.ERROR) {
            this._onError.dispatch("Error while processing task");
            reject(null);
          }
          resolve(null);
        },
        () => {
          this._onError.dispatch("Error while checking task status");
          reject(null);
        }
      );
    });
  }
}
