import { FileProcessor } from "./FileProcessor.service";
import { TaskHandler } from "./TaskHandler.service";
import axios from "axios";
import { TaskObserver } from "./TaskObserver.service";
import { Language } from "../Models/Language";
import { NEREventDispatcher } from "./NEREventDispatcher.service";
jest.mock("./NEREventDispatcher.service");
jest.mock("./TaskHandler.service");
jest.mock("axios");

describe("FileProcessor", () => {
  const mockEventDispatcher = new NEREventDispatcher() as jest.Mocked<NEREventDispatcher>;
  const mockTaskHandler = new TaskHandler(
    {} as TaskObserver,
    mockEventDispatcher
  ) as jest.Mocked<TaskHandler>;
  const fileProcessor = new FileProcessor(mockTaskHandler, mockEventDispatcher);
  jest.mock("axios");

  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it("should hit APIUrls.UPLOAD URL and start task for archive", async () => {
    const file = Buffer.from("", "base64");
    const properHeader = {
      headers: {
        "Content-Type": "application/octet-stream",
      },
    };
    const fileType = "zip";
    const language = "pl";
    const NERData = {
      data: "/users/default/9d0c0893-5c00-4ca8-8479-77f467c0fb4c",
    };
    mockTaskHandler.startTaskArchive.mockResolvedValue(null);
    const spyAxios = jest.spyOn(axios, "post");
    spyAxios.mockResolvedValue(NERData);
    await fileProcessor.process(file, fileType, language);

    expect(mockTaskHandler.startTaskArchive).toHaveBeenCalled();
    expect(spyAxios).toHaveBeenCalled();
    expect(spyAxios).toHaveBeenCalledWith(
      "https://ws.clarin-pl.eu/nlprest2/base/upload/",
      file,
      properHeader
    );
  });

  it("should hit APIUrls.UPLOAD URL and start task for document", async () => {
    const file = Buffer.from("", "base64");
    const properHeader = {
      headers: {
        "Content-Type": "application/octet-stream",
      },
    };
    const fileType = "pdf";
    const language = "pl";
    const NERData = {
      data: "/users/default/9d0c0893-5c00-4ca8-8479-77f467c0fb4c",
    };
    mockTaskHandler.startTaskDocument.mockResolvedValue(null);
    const spyAxios = jest.spyOn(axios, "post");
    spyAxios.mockResolvedValue(NERData);
    await fileProcessor.process(file, fileType, language);

    expect(mockTaskHandler.startTaskDocument).toHaveBeenCalled();
    expect(spyAxios).toHaveBeenCalled();
    expect(spyAxios).toHaveBeenCalledWith(
      "https://ws.clarin-pl.eu/nlprest2/base/upload/",
      file,
      properHeader
    );
  });

  it("should try to hit APIUrls.UPLOAD URL and miss", async () => {
    const file = Buffer.from("", "base64");
    const fileType = "zip";
    const language = Language.PL;
    mockTaskHandler.startTaskArchive.mockResolvedValue(null);
    mockTaskHandler.startTaskDocument.mockResolvedValue(null);
    mockEventDispatcher.dispatchError.mockReturnValue();
    const spyAxios = jest.spyOn(axios, "post");
    spyAxios.mockRejectedValue(new Error("test"));
    fileProcessor.process(file, fileType, language).then(
      (resolve) => {
        expect(resolve).toBeNull();
      },
      () => {
        expect(mockTaskHandler.startTaskArchive).not.toHaveBeenCalled();
        expect(mockTaskHandler.startTaskDocument).not.toHaveBeenCalled();
        expect(mockEventDispatcher.dispatchError).toHaveBeenCalled();
      }
    );
  });
});
