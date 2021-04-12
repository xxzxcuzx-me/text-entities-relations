import { TaskHandler } from "./TaskHandler";
import { TaskObserver } from "./TaskObserver";
import axios from "axios";
import { ResultProcessor } from "./ResultProcessor";
import { NEREventDispatcher } from "./NEREventDispatcher";
import { Language } from "../Models/Language";
jest.mock("./NEREventDispatcher");
jest.mock("./TaskObserver");
jest.mock("axios");

describe("TaskHandler", () => {
  const mockEventDispatcher = new NEREventDispatcher() as jest.Mocked<NEREventDispatcher>;
  const mockTaskObserver = new TaskObserver(
    {} as ResultProcessor,
    mockEventDispatcher
  ) as jest.Mocked<TaskObserver>;
  const taskHandler = new TaskHandler(mockTaskObserver, mockEventDispatcher);

  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it("should hit APIUrls.START URL and tell it to use zip file", async () => {
    const fileHandle = "/test";
    const language = Language.PL;
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
    mockTaskObserver.observeTask.mockResolvedValue(null);
    const spyAxios = jest.spyOn(axios, "post");
    spyAxios.mockResolvedValue(NERData);
    await taskHandler.startTaskArchive(fileHandle, language);

    expect(mockTaskObserver.observeTask).toHaveBeenCalled();
    expect(spyAxios).toHaveBeenCalled();
    expect(spyAxios).toHaveBeenCalledWith(
      "https://ws.clarin-pl.eu/nlprest2/base/startTask/",
      properData,
      properHeader
    );
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
    mockTaskObserver.observeTask.mockResolvedValue(null);
    const spyAxios = jest.spyOn(axios, "post");
    spyAxios.mockResolvedValue(NERData);
    await taskHandler.startTaskDocument(fileHandle, language);

    expect(mockTaskObserver.observeTask).toHaveBeenCalled();
    expect(spyAxios).toHaveBeenCalled();
    expect(spyAxios).toHaveBeenCalledWith(
      "https://ws.clarin-pl.eu/nlprest2/base/startTask/",
      properData,
      properHeader
    );
  });

  it("should try to hit APIUrls.START URL and miss", async () => {
    mockEventDispatcher.dispatchError.mockReturnValue();
    mockTaskObserver.observeTask.mockResolvedValue(null);
    const spyAxios = jest.spyOn(axios, "post");
    spyAxios.mockRejectedValue(new Error("test"));
    const fileHandle = "/test";
    const language = "pl";
    taskHandler.startTaskArchive(fileHandle, language).then(
      (resolve) => {
        expect(resolve).toBeNull();
      },
      () => {
        expect(mockTaskObserver.observeTask).not.toHaveBeenCalled();
        expect(mockEventDispatcher.dispatchError).toHaveBeenCalled();
      }
    );
  });
});
