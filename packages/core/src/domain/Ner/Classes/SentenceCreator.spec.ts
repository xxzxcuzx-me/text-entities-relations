import { SentenceCreator } from "./SentenceCreator";
import { TokenCreator } from "./TokenCreator";

describe("SentenceCreator", () => {
  let sentenceCreator: SentenceCreator;

  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    sentenceCreator = new SentenceCreator();
  });

  it("should create one sentence and push it into array", () => {
    const spy = jest.spyOn(TokenCreator.prototype, "createToken");
    spy.mockReturnValue("0");
    const sentence = {
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
    };
    const sentenceCounter = 0;
    const newSentence = sentenceCreator.createSentence(
      sentenceCounter,
      sentence
    );

    expect(newSentence.sentenceIndex).toBe(0);
    expect(newSentence.sentenceGlobalIndex).toBe(0);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it("should create two sentences and push them into array", () => {
    const spy = jest.spyOn(TokenCreator.prototype, "createToken");
    spy.mockReturnValue("0");
    const sentence = {
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
    };
    let sentenceCounter = 0;
    sentenceCreator.createSentence(sentenceCounter, sentence);
    sentenceCounter++;
    const newSentence = sentenceCreator.createSentence(
      sentenceCounter,
      sentence
    );

    expect(newSentence.sentenceIndex).toBe(1);
    expect(newSentence.sentenceGlobalIndex).toBe(1);
    expect(spy).toHaveBeenCalledTimes(4);
  });
});
