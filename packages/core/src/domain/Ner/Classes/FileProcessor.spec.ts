import { FileProcessor } from "./FileProcessor";
import { TaskHandler } from "./TaskHandler";
import { SimpleEventDispatcher } from "strongly-typed-events";
import axios from "axios";

describe("FileProcessor", () => {
  let fileProcessor: FileProcessor;
  const _onError = new SimpleEventDispatcher<string>();

  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    fileProcessor = new FileProcessor(_onError);
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
    const spyStartTaskArchive = jest.spyOn(
      TaskHandler.prototype,
      "startTaskArchive"
    );
    spyStartTaskArchive.mockResolvedValue(null);
    const spyAxios = jest.spyOn(axios, "post");
    spyAxios.mockResolvedValue(NERData);
    await fileProcessor.process(file, fileType, language);

    expect(spyStartTaskArchive).toHaveBeenCalledTimes(1);
    expect(spyAxios).toHaveBeenCalledTimes(1);
    expect(spyAxios.mock.calls[0][0]).toBe(
      "https://ws.clarin-pl.eu/nlprest2/base/upload/"
    );
    expect(spyAxios.mock.calls[0][1]).toStrictEqual(file);
    expect(spyAxios.mock.calls[0][2]).toStrictEqual(properHeader);
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
    const spyStartTaskDocument = jest.spyOn(
      TaskHandler.prototype,
      "startTaskDocument"
    );
    spyStartTaskDocument.mockResolvedValue(null);
    const spyAxios = jest.spyOn(axios, "post");
    spyAxios.mockResolvedValue(NERData);
    await fileProcessor.process(file, fileType, language);

    expect(spyStartTaskDocument).toHaveBeenCalledTimes(1);
    expect(spyAxios).toHaveBeenCalledTimes(1);
    expect(spyAxios.mock.calls[0][0]).toBe(
      "https://ws.clarin-pl.eu/nlprest2/base/upload/"
    );
    expect(spyAxios.mock.calls[0][1]).toStrictEqual(file);
    expect(spyAxios.mock.calls[0][2]).toStrictEqual(properHeader);
  });

  it("should try to hit APIUrls.UPLOAD URL and miss", async () => {
    const file = Buffer.from("", "base64");
    const fileType = "zip";
    const language = "pl";
    const spyError = jest.spyOn(SimpleEventDispatcher.prototype, "dispatch");
    const spyAxios = jest.spyOn(axios, "post");
    spyAxios.mockRejectedValue(new Error("test"));
    fileProcessor.process(file, fileType, language).then(
      (resolve) => {
        expect(resolve).toBeNull();
      },
      () => {
        expect(spyError).toHaveBeenCalledTimes(1);
      }
    );
  });
});
