import { APIUrls, baseURL } from "../Constants";
import axios from "axios";
import { TaskHandler } from "./TaskHandler.service";
import { Service } from "typedi";
import { NEREventDispatcher } from "./NEREventDispatcher.service";

@Service()
export class FileProcessor {
  private headers = {
    headers: {
      "Content-Type": "application/octet-stream",
    },
  };

  constructor(
    private taskHandler: TaskHandler,
    private eventDispatcher: NEREventDispatcher
  ) {}

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
          this.eventDispatcher.dispatchError("Error while uploading file");
          reject(null);
        }
      );
    });
  }
}
