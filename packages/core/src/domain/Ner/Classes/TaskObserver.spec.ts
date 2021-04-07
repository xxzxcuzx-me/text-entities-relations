import { TaskObserver } from "./TaskObserver";
import { ResultProcessor } from "./ResultProcessor";
import { ChunkList } from "../Models/ChunkList";
import axios from "axios";
import { SimpleEventDispatcher } from "strongly-typed-events";

describe("TaskObserver", () => {
  let taskObserver: TaskObserver;
  const _onError = new SimpleEventDispatcher<string>();

  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    taskObserver = new TaskObserver(_onError);
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
    const spyOnProcessResult = jest.spyOn(
      ResultProcessor.prototype,
      "processResult"
    );
    const testChunkList: ChunkList = [];
    spyOnProcessResult.mockResolvedValue(testChunkList);
    const spyOnEvent = jest.spyOn(SimpleEventDispatcher.prototype, "dispatch");
    const spyAxios = jest.spyOn(axios, "get");
    spyAxios
      .mockResolvedValueOnce(dataProcessing)
      .mockResolvedValueOnce(dataProcessing)
      .mockResolvedValue(dataDone);
    const taskHandle = "test";
    await taskObserver.observeTask(taskHandle);

    expect(spyOnEvent).toHaveBeenCalledTimes(4);
    expect(spyOnEvent.mock.calls[0][0]).toBe(0.3333333333333333);
    expect(spyOnEvent.mock.calls[2][0]).toBe(1);
    expect(spyOnEvent.mock.calls[3][0]).toStrictEqual(testChunkList);
    expect(spyAxios).toHaveBeenCalledTimes(3);
    expect(spyAxios.mock.calls[0][0]).toBe(
      "https://ws.clarin-pl.eu/nlprest2/base/getStatus/" + taskHandle
    );
  });

  it("should try to hit proper APIUrls.STATUS URL and miss", async () => {
    const spyError = jest.spyOn(SimpleEventDispatcher.prototype, "dispatch");
    const spyAxios = jest.spyOn(axios, "get");
    spyAxios.mockRejectedValue(new Error("test"));
    const taskHandle = "test";
    taskObserver.observeTask(taskHandle).then(
      (resolve) => {
        expect(resolve).toBeNull();
      },
      () => {
        expect(spyError).toHaveBeenCalledTimes(1);
      }
    );
  });
});
