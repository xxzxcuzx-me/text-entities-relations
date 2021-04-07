import { TaskHandler } from "./TaskHandler";
import { TaskObserver } from "./TaskObserver";
import { SimpleEventDispatcher } from "strongly-typed-events";
import axios from "axios";

describe("TaskHandler", () => {
  let taskHandler: TaskHandler;
  const _onError = new SimpleEventDispatcher<string>();

  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    taskHandler = new TaskHandler(_onError);
  });

  it("should hit APIUrls.START URL and tell it to use zip file", async () => {
    const fileHandle = "/test";
    const language = "pl";
    const NERData = {
      data: "00d43a5d-336a-4725-9e2f-9830650f6f90",
    };
    const properHeader = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const properData = {
      lpmn:
        "filezip(" +
        fileHandle +
        ")|" +
        'any2txt|spacy({"method":"ner","lang":"' +
        language +
        '"})',
      user: "Grupa D",
    };
    const spyObserveTask = jest.spyOn(TaskObserver.prototype, "observeTask");
    spyObserveTask.mockResolvedValue(null);
    const spyAxios = jest.spyOn(axios, "post");
    spyAxios.mockResolvedValue(NERData);
    await taskHandler.startTaskArchive(fileHandle, language);

    expect(spyObserveTask).toHaveBeenCalledTimes(1);
    expect(spyAxios).toHaveBeenCalledTimes(1);
    expect(spyAxios.mock.calls[0][0]).toBe(
      "https://ws.clarin-pl.eu/nlprest2/base/startTask/"
    );
    expect(spyAxios.mock.calls[0][1]).toStrictEqual(properData);
    expect(spyAxios.mock.calls[0][2]).toStrictEqual(properHeader);
  });

  it("should hit APIUrls.START URL and tell it to use document file", async () => {
    const fileHandle = "/test";
    const language = "pl";
    const NERData = {
      data: "00d43a5d-336a-4725-9e2f-9830650f6f90",
    };
    const properHeader = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const properData = {
      lpmn: 'any2txt|spacy({"method":"ner","lang":"' + language + '"})',
      file: fileHandle,
      user: "Grupa D",
    };
    const spyObserveTask = jest.spyOn(TaskObserver.prototype, "observeTask");
    spyObserveTask.mockResolvedValue(null);
    const spyAxios = jest.spyOn(axios, "post");
    spyAxios.mockResolvedValue(NERData);
    await taskHandler.startTaskDocument(fileHandle, language);

    expect(spyObserveTask).toHaveBeenCalledTimes(1);
    expect(spyAxios).toHaveBeenCalledTimes(1);
    expect(spyAxios.mock.calls[0][0]).toBe(
      "https://ws.clarin-pl.eu/nlprest2/base/startTask/"
    );
    expect(spyAxios.mock.calls[0][1]).toStrictEqual(properData);
    expect(spyAxios.mock.calls[0][2]).toStrictEqual(properHeader);
  });

  it("should try to hit APIUrls.START URL and miss", async () => {
    const spyError = jest.spyOn(SimpleEventDispatcher.prototype, "dispatch");
    const spyAxios = jest.spyOn(axios, "post");
    spyAxios.mockRejectedValue(new Error("test"));
    const fileHandle = "/test";
    const language = "pl";
    taskHandler.startTaskArchive(fileHandle, language).then(
      (resolve) => {
        expect(resolve).toBeNull();
      },
      () => {
        expect(spyError).toHaveBeenCalledTimes(1);
      }
    );
  });
});
