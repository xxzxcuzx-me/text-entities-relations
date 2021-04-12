import { SentenceCreator } from "./SentenceCreator";
import { TokenCreator } from "./TokenCreator";
jest.mock("./TokenCreator");

describe("SentenceCreator", () => {
  const mockTokenCreator = new TokenCreator() as jest.Mocked<TokenCreator>;
  const sentenceCreator = new SentenceCreator(mockTokenCreator);

  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    sentenceCreator.reset();
  });

  it("should create one sentence and push it into array", () => {
    mockTokenCreator.createToken.mockReturnValue("0");
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
    expect(mockTokenCreator.createToken).toHaveBeenCalledTimes(2);
  });

  it("should create two sentences and push them into array", () => {
    mockTokenCreator.createToken.mockReturnValue("0");
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
    expect(mockTokenCreator.createToken).toHaveBeenCalledTimes(4);
  });
});
