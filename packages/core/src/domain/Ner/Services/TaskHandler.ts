import { APIUrls, baseURL } from "../Constants";
import axios from "axios";
import { TaskObserver } from "./TaskObserver";
import { Service } from "typedi";
import { NEREventDispatcher } from "./NEREventDispatcher";

@Service()
export class TaskHandler {
  private headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  private user = "Grupa D";

  constructor(
    private taskObserver: TaskObserver,
    private eventDispatcher: NEREventDispatcher
  ) {}

  public startTaskArchive(fileHandle: string, language: string): Promise<null> {
    const data = {
      lpmn: this.getLPMNForLanguageArchive(fileHandle, language),
      user: this.user,
    };
    return this.sendRequest(data);
  }

  public startTaskDocument(
    fileHandle: string,
    language: string
  ): Promise<null> {
    const data = {
      lpmn: this.getLPMNForLanguage(language),
      file: fileHandle,
      user: this.user,
    };
    return this.sendRequest(data);
  }

  private sendRequest(data: Record<string, unknown>): Promise<null> {
    const URL = baseURL + APIUrls.START;
    return new Promise((resolve, reject) => {
      axios.post(URL, data, this.headers).then(
        async (response) => {
          const taskHandle = response.data;
          await this.taskObserver.observeTask(taskHandle);
          resolve(null);
        },
        () => {
          this.eventDispatcher.dispatchError("Error while starting task");
          reject(null);
        }
      );
    });
  }

  private getLPMNForLanguage(language: string): string {
    return 'any2txt|spacy({"method":"ner","lang":"' + language + '"})';
  }

  private getLPMNForLanguageArchive(
    fileHandle: string,
    language: string
  ): string {
    return "filezip(" + fileHandle + ")|" + this.getLPMNForLanguage(language);
  }
}
