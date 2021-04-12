import { ChunkCreator } from "./ChunkCreator";
import { SentenceCreator } from "./SentenceCreator";
import { Sentence } from "../Models/Sentence";
import { TokenCreator } from "./TokenCreator";
jest.mock("./SentenceCreator");

describe("ChunkCreator", () => {
  const mockSentenceCreator = new SentenceCreator(
    {} as TokenCreator
  ) as jest.Mocked<SentenceCreator>;
  const chunkCreator = new ChunkCreator(mockSentenceCreator);

  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    chunkCreator.reset();
  });

  it("should create one chunk and push it into array", () => {
    const testSentence: Sentence = {
      tokens: [],
      sentenceGlobalIndex: 0,
      sentenceIndex: 0,
    };
    mockSentenceCreator.createSentence.mockReturnValue(testSentence);
    const chunkCounter = 0;
    const chunk = {
      sentence: [
        {
          tok: [
            {
              orth: ["Harry"],
              lex: [{ base: ["harry"], ctag: ["PRON"], $: { disamb: "1" } }],
              ann: [],
            },
            {
              orth: ["Potter"],
              lex: [{ base: ["harry"], ctag: ["PRON"], $: { disamb: "1" } }],
              ann: [],
            },
          ],
          ns: [],
        },
        {
          tok: [
            {
              orth: ["Harry"],
              lex: [{ base: ["harry"], ctag: ["PRON"], $: { disamb: "1" } }],
              ann: [],
            },
            {
              orth: ["Potter"],
              lex: [{ base: ["harry"], ctag: ["PRON"], $: { disamb: "1" } }],
              ann: [],
            },
          ],
          ns: [],
        },
      ],
    };
    const newChunk = chunkCreator.createChunk(chunkCounter, chunk);

    expect(newChunk.chunkIndex).toBe(0);
    expect(mockSentenceCreator.createSentence).toHaveBeenCalledTimes(2);
  });

  it("should create two chunks and push them into array", () => {
    const testSentence: Sentence = {
      tokens: [],
      sentenceGlobalIndex: 0,
      sentenceIndex: 0,
    };
    mockSentenceCreator.createSentence.mockReturnValue(testSentence);
    let chunkCounter = 0;
    const chunk = {
      sentence: [
        {
          tok: [
            {
              orth: ["Harry"],
              lex: [{ base: ["harry"], ctag: ["PRON"], $: { disamb: "1" } }],
              ann: [],
            },
            {
              orth: ["Potter"],
              lex: [{ base: ["harry"], ctag: ["PRON"], $: { disamb: "1" } }],
              ann: [],
            },
          ],
          ns: [],
        },
        {
          tok: [
            {
              orth: ["Harry"],
              lex: [{ base: ["harry"], ctag: ["PRON"], $: { disamb: "1" } }],
              ann: [],
            },
            {
              orth: ["Potter"],
              lex: [{ base: ["harry"], ctag: ["PRON"], $: { disamb: "1" } }],
              ann: [],
            },
          ],
          ns: [],
        },
      ],
    };

    chunkCreator.createChunk(chunkCounter, chunk);
    chunkCounter++;
    const newChunk = chunkCreator.createChunk(chunkCounter, chunk);

    expect(newChunk.chunkIndex).toBe(1);
    expect(mockSentenceCreator.createSentence).toHaveBeenCalledTimes(4);
  });
});
