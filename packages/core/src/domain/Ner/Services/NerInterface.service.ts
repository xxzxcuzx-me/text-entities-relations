import Container, { Service } from "typedi";
import { ISimpleEvent } from "strongly-typed-events";
import { ChunkList } from "../Models/ChunkList";
import { FileProcessor } from "./FileProcessor.service";
import { NEREventDispatcher } from "./NEREventDispatcher.service";
import { TaskHandler } from "./TaskHandler.service";
import { TaskObserver } from "./TaskObserver.service";
import { ResultProcessor } from "./ResultProcessor.service";
import { ChunkListCreator } from "./ChunkListCreator.service";
import { ChunkCreator } from "./ChunkCreator.service";
import { SentenceCreator } from "./SentenceCreator.service";
import { TokenCreator } from "./TokenCreator.service";

/**
 * Responsible for sending and obtaining results of NER processing.
 * Fetches and emits progress events.
 */
@Service()
export class NerInterfaceService {
  constructor(
    private fileProcessor: FileProcessor,
    private eventDispatcher: NEREventDispatcher
  ) {}

  get onProgress(): ISimpleEvent<number> {
    return this.eventDispatcher.onProgress;
  }

  get onSuccess(): ISimpleEvent<ChunkList> {
    return this.eventDispatcher.onSuccess;
  }

  get onError(): ISimpleEvent<string> {
    return this.eventDispatcher.onError;
  }

  static get(): NerInterfaceService {
    const eventDispatcher = new NEREventDispatcher();
    const tokenCreator = new TokenCreator();
    const sentenceCreator = new SentenceCreator(tokenCreator);
    const chunkCreator = new ChunkCreator(sentenceCreator);
    const chunkListCreator = new ChunkListCreator(chunkCreator);
    const resultProcessor = new ResultProcessor(
      chunkListCreator,
      eventDispatcher
    );
    const taskObserver = new TaskObserver(resultProcessor, eventDispatcher);
    const taskHandler = new TaskHandler(taskObserver, eventDispatcher);
    const fileProcessor = new FileProcessor(taskHandler, eventDispatcher);

    Container.set(NEREventDispatcher, eventDispatcher);
    Container.set(TokenCreator, tokenCreator);
    Container.set(SentenceCreator, sentenceCreator);
    Container.set(ChunkCreator, chunkCreator);
    Container.set(ChunkListCreator, chunkListCreator);
    Container.set(ResultProcessor, resultProcessor);
    Container.set(TaskObserver, taskObserver);
    Container.set(TaskHandler, taskHandler);
    Container.set(FileProcessor, fileProcessor);
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
