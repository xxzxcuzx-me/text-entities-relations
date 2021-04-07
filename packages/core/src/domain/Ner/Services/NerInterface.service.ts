import Container, { Service } from "typedi";
import { SimpleEventDispatcher, ISimpleEvent } from "strongly-typed-events";
import { ChunkList } from "../Models/ChunkList";
import { FileProcessor } from "../Classes/FileProcessor";

/**
 * Responsible for sending and obtaining results of NER processing.
 * Fetches and emits progress events.
 */
@Service()
export class NerInterfaceService {
  private _onError = new SimpleEventDispatcher<string>();
  private fileProcessor = new FileProcessor(this._onError);
  get onProgress(): ISimpleEvent<number> {
    return this.fileProcessor.onProgress;
  }

  get onSuccess(): ISimpleEvent<ChunkList> {
    return this.fileProcessor.onSuccess;
  }

  get onError(): ISimpleEvent<string> {
    return this._onError.asEvent();
  }

  static get(): NerInterfaceService {
    return Container.get(NerInterfaceService);
  }

  public processFile(
    file: Buffer,
    fileType: string,
    language: string
  ): Promise<null> {
    return new Promise(async (resolve, reject) => {
      this.fileProcessor.process(file, fileType, language).then(
        () => {
          resolve(null);
        },
        () => {
          reject(null);
        }
      );
    });
  }
}
