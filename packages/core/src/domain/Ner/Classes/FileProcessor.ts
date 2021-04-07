import { APIUrls, baseURL } from "../Constants";
import axios from "axios";
import { SimpleEventDispatcher, ISimpleEvent } from "strongly-typed-events";
import { TaskHandler } from "./TaskHandler";
import { ChunkList } from "../Models/ChunkList";

export class FileProcessor {
  private headers = {
    headers: {
      "Content-Type": "application/octet-stream",
    },
  };
  private taskHandler: TaskHandler;
  private _onError: SimpleEventDispatcher<string>;

  constructor(_onError: SimpleEventDispatcher<string>) {
    this._onError = _onError;
    this.taskHandler = new TaskHandler(_onError);
  }

  get onProgress(): ISimpleEvent<number> {
    return this.taskHandler.onProgress;
  }

  get onSuccess(): ISimpleEvent<ChunkList> {
    return this.taskHandler.onSuccess;
  }

  public process(
    file: Buffer,
    fileType: string,
    language: string
  ): Promise<null> {
    const URL = baseURL + APIUrls.UPLOAD;
    return new Promise((resolve, reject) => {
      axios.post(URL, file, this.headers).then(
        async (response) => {
          const fileHandle = response.data;
          if (fileType == "zip")
            await this.taskHandler.startTaskArchive(fileHandle, language);
          else await this.taskHandler.startTaskDocument(fileHandle, language);
          resolve(null);
        },
        () => {
          this._onError.dispatch("Error while uploading file");
          reject(null);
        }
      );
    });
  }
}
