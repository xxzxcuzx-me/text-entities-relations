import { ChunkCreator } from "./ChunkCreator";
import { SentenceCreator } from "./SentenceCreator";
import { Sentence } from "../Models/Sentence";

describe("ChunkCreator", () => {
  let chunkCreator: ChunkCreator;

  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    chunkCreator = new ChunkCreator();
  });

  it("should create one chunk and push it into array", () => {
    const spy = jest.spyOn(SentenceCreator.prototype, "createSentence");
    const testSentence: Sentence = {
      tokens: [],
      sentenceGlobalIndex: 0,
      sentenceIndex: 0,
    };
    spy.mockReturnValue(testSentence);
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
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it("should create two chunks and push them into array", () => {
    const spy = jest.spyOn(SentenceCreator.prototype, "createSentence");
    const testSentence: Sentence = {
      tokens: [],
      sentenceGlobalIndex: 0,
      sentenceIndex: 0,
    };
    spy.mockReturnValue(testSentence);
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
    expect(spy).toHaveBeenCalledTimes(4);
  });
});
