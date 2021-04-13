import { APIUrls, baseURL, Status } from "../Constants";
import axios from "axios";
import { ChunkList } from "../Models/ChunkList";
import { ResultProcessor } from "./ResultProcessor.service";
import { Service } from "typedi";
import { NEREventDispatcher } from "./NEREventDispatcher.service";

@Service()
export class TaskObserver {
  private interval = 1000;

  constructor(
    private resultProcessor: ResultProcessor,
    private eventDispatcher: NEREventDispatcher
  ) {}

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
            this.eventDispatcher.dispatchProgress(data.value);
            await this.timeout(this.interval);
            await this.observeTask(taskHandle);
          } else if (data.status === Status.DONE) {
            this.eventDispatcher.dispatchProgress(1);
            const result: ChunkList = [];
            this.resultProcessor.reset();
            for (const resultFile of data.value) {
              const resultHandle = resultFile["fileID"];
              const newResult = await this.resultProcessor.processResult(
                resultHandle
              );
              result.push(...newResult);
            }
            this.eventDispatcher.dispatchSuccess(result);
          } else if (data.status === Status.ERROR) {
            this.eventDispatcher.dispatchError("Error while processing task");
            reject(null);
          }
          resolve(null);
        },
        () => {
          this.eventDispatcher.dispatchError(
            "Error while checking task status"
          );
          reject(null);
        }
      );
    });
  }
}
