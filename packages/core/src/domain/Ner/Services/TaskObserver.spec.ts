import { TaskObserver } from "./TaskObserver";
import { ResultProcessor } from "./ResultProcessor";
import { ChunkList } from "../Models/ChunkList";
import axios from "axios";
import { NEREventDispatcher } from "./NEREventDispatcher";
import { ChunkListCreator } from "./ChunkListCreator";
jest.mock("./NEREventDispatcher");
jest.mock("./ResultProcessor");
jest.mock("axios");

describe("TaskObserver", () => {
  const mockEventDispatcher = new NEREventDispatcher() as jest.Mocked<NEREventDispatcher>;
  const mockResultProcessor = new ResultProcessor(
    {} as ChunkListCreator,
    mockEventDispatcher
  ) as jest.Mocked<ResultProcessor>;
  const taskObserver = new TaskObserver(
    mockResultProcessor,
    mockEventDispatcher
  );

  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    mockResultProcessor.reset();
  });

  it("should try to hit proper APIUrls.STATUS URL", async () => {
    const dataProcessing = {
      data: { value: 0.3333333333333333, status: "PROCESSING" },
    };
    const dataDone = {
      data: {
        value: [
          {
            name: "file",
            fileID: "/requests/spacy/c3c13c84-3578-43bb-840b-ba14c5fa1b99",
          },
        ],
        status: "DONE",
      },
    };
    const testChunkList: ChunkList = [];
    mockResultProcessor.processResult.mockResolvedValue(testChunkList);
    mockEventDispatcher.dispatchProgress.mockReturnValue();
    mockEventDispatcher.dispatchSuccess.mockReturnValue();
    const spyAxios = jest.spyOn(axios, "get");
    spyAxios
      .mockResolvedValueOnce(dataProcessing)
      .mockResolvedValueOnce(dataProcessing)
      .mockResolvedValue(dataDone);
    const taskHandle = "test";
    await taskObserver.observeTask(taskHandle);

    expect(mockEventDispatcher.dispatchProgress).toHaveBeenCalledTimes(3);
    expect(mockEventDispatcher.dispatchSuccess).toHaveBeenCalledTimes(1);
    expect(mockEventDispatcher.dispatchProgress).toHaveBeenNthCalledWith(
      1,
      0.3333333333333333
    );
    expect(mockEventDispatcher.dispatchProgress).toHaveBeenNthCalledWith(
      2,
      0.3333333333333333
    );
    expect(mockEventDispatcher.dispatchProgress).toHaveBeenNthCalledWith(3, 1);
    expect(mockEventDispatcher.dispatchSuccess).toHaveBeenCalledWith(
      testChunkList
    );
    expect(spyAxios).toHaveBeenCalledTimes(3);
    expect(spyAxios).toHaveBeenCalledWith(
      "https://ws.clarin-pl.eu/nlprest2/base/getStatus/" + taskHandle
    );
  });

  it("should try to hit proper APIUrls.STATUS URL and miss", async () => {
    mockEventDispatcher.dispatchError.mockReturnValue();
    const testChunkList: ChunkList = [];
    mockResultProcessor.processResult.mockResolvedValue(testChunkList);
    const spyAxios = jest.spyOn(axios, "get");
    spyAxios.mockRejectedValue(new Error("test"));
    const taskHandle = "test";
    taskObserver.observeTask(taskHandle).then(
      (resolve) => {
        expect(resolve).toBeNull();
      },
      () => {
        expect(mockEventDispatcher.dispatchError).toHaveBeenCalled();
        expect(mockResultProcessor.processResult).not.toHaveBeenCalled();
      }
    );
  });
});
