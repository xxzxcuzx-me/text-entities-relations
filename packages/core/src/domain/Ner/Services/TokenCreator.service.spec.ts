import { TokenCreator } from "./TokenCreator.service";
import { Sentence } from "../Models/Sentence";
import { Token } from "../Models/Token";
import { XMLToken } from "../Constants";
import { TokenType } from "../Models/TokenType";

describe("TokenCreator", () => {
  const tokenCreator = new TokenCreator();

  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    tokenCreator.reset();
  });

  it("should create one token and push it into array", () => {
    const annotation = "1";
    const token: XMLToken = {
      orth: ["Harry"],
      lex: [{ base: ["harry"], ctag: ["PRON"], $: { disamb: "1" } }],
      ann: [
        { _: annotation, $: { chan: TokenType.PERSON } },
        { _: "0", $: { chan: TokenType.PLACE } },
      ],
    };
    const properToken: Token = {
      name: "harry",
      type: TokenType.PERSON,
      tokenIndex: 0,
      tokenGlobalIndex: 0,
    };
    const wordCounter = 0;
    const sentence: Sentence = {
      tokens: [],
      sentenceIndex: 0,
      sentenceGlobalIndex: 0,
    };

    let lastAnnotation = "0";
    lastAnnotation = tokenCreator.createToken(
      wordCounter,
      sentence,
      lastAnnotation,
      token
    );

    const newToken = sentence.tokens.slice(-1)[0];
    expect(lastAnnotation).toBe(annotation);
    expect(newToken).toStrictEqual(properToken);
  });

  it("should create one token made of two words and push it into array", () => {
    const annotation = "1";
    let token = {
      orth: ["Harry"],
      lex: [{ base: ["harry"], ctag: ["PRON"], $: { disamb: "1" } }],
      ann: [{ _: annotation, $: { chan: TokenType.PERSON } }],
    };

    let wordCounter = 0;
    const sentence: Sentence = {
      tokens: [],
      sentenceIndex: 0,
      sentenceGlobalIndex: 0,
    };

    let lastAnnotation = "0";
    lastAnnotation = tokenCreator.createToken(
      wordCounter,
      sentence,
      annotation,
      token
    );

    token = {
      orth: ["Potter"],
      lex: [{ base: ["potter"], ctag: ["PRON"], $: { disamb: "1" } }],
      ann: [{ _: annotation, $: { chan: TokenType.PERSON } }],
    };

    const properToken = {
      name: "harry potter",
      type: TokenType.PERSON,
      tokenIndex: 0,
      tokenGlobalIndex: 0,
    };
    wordCounter++;

    lastAnnotation = tokenCreator.createToken(
      wordCounter,
      sentence,
      lastAnnotation,
      token
    );

    const newToken = sentence.tokens.slice(-1)[0];
    expect(lastAnnotation).toBe(annotation);
    expect(newToken).toStrictEqual(properToken);
  });

  it("should create one token and skip another", () => {
    let annotation = "1";
    let token = {
      orth: ["Harry"],
      lex: [{ base: ["harry"], ctag: ["PRON"], $: { disamb: "1" } }],
      ann: [{ _: annotation, $: { chan: TokenType.PERSON } }],
    };

    let wordCounter = 0;
    const sentence: Sentence = {
      tokens: [],
      sentenceIndex: 0,
      sentenceGlobalIndex: 0,
    };
    let lastAnnotation = "0";
    lastAnnotation = tokenCreator.createToken(
      wordCounter,
      sentence,
      lastAnnotation,
      token
    );

    const tokenNumber = sentence.tokens.length;
    annotation = "0";
    token = {
      orth: ["test"],
      lex: [{ base: ["test"], ctag: ["PRON"], $: { disamb: "1" } }],
      ann: [{ _: annotation, $: { chan: TokenType.PERSON } }],
    };
    wordCounter++;

    lastAnnotation = tokenCreator.createToken(
      wordCounter,
      sentence,
      lastAnnotation,
      token
    );

    expect(sentence.tokens.length).toBe(tokenNumber);
    expect(lastAnnotation).toStrictEqual(annotation);
  });

  it("should create one token made of two words and second made of one word, one after another", () => {
    let annotation = "1";
    let token = {
      orth: ["Harry"],
      lex: [{ base: ["harry"], ctag: ["PRON"], $: { disamb: "1" } }],
      ann: [
        { _: annotation, $: { chan: TokenType.PERSON } },
        { _: "0", $: { chan: TokenType.PLACE } },
      ],
    };

    let wordCounter = 0;
    const sentence: Sentence = {
      tokens: [],
      sentenceIndex: 0,
      sentenceGlobalIndex: 0,
    };

    let lastAnnotation = "0";
    lastAnnotation = tokenCreator.createToken(
      wordCounter,
      sentence,
      annotation,
      token
    );

    token = {
      orth: ["Potter"],
      lex: [{ base: ["potter"], ctag: ["PRON"], $: { disamb: "1" } }],
      ann: [
        { _: annotation, $: { chan: TokenType.PERSON } },
        { _: "0", $: { chan: TokenType.PLACE } },
      ],
    };
    wordCounter++;

    lastAnnotation = tokenCreator.createToken(
      wordCounter,
      sentence,
      lastAnnotation,
      token
    );

    annotation = "1";
    token = {
      orth: ["Hogwart"],
      lex: [{ base: ["hogwart"], ctag: ["PRON"], $: { disamb: "1" } }],
      ann: [
        { _: "0", $: { chan: TokenType.PERSON } },
        { _: annotation, $: { chan: TokenType.PLACE } },
      ],
    };

    const properToken: Token = {
      name: "hogwart",
      type: TokenType.PLACE,
      tokenIndex: 2,
      tokenGlobalIndex: 2,
    };
    wordCounter++;

    lastAnnotation = tokenCreator.createToken(
      wordCounter,
      sentence,
      lastAnnotation,
      token
    );

    const newToken = sentence.tokens.slice(-1)[0];
    expect(lastAnnotation).toBe(annotation);
    expect(newToken).toStrictEqual(properToken);
  });

  it("should create one token made of two words and second made of one word, with non-entity word inbetween", () => {
    let annotation = "1";
    let token = {
      orth: ["Harry"],
      lex: [{ base: ["harry"], ctag: ["PRON"], $: { disamb: "1" } }],
      ann: [
        { _: annotation, $: { chan: TokenType.PERSON } },
        { _: "0", $: { chan: TokenType.PLACE } },
      ],
    };

    let wordCounter = 0;
    const sentence: Sentence = {
      tokens: [],
      sentenceIndex: 0,
      sentenceGlobalIndex: 0,
    };

    let lastAnnotation = "0";
    lastAnnotation = tokenCreator.createToken(
      wordCounter,
      sentence,
      lastAnnotation,
      token
    );

    annotation = "1";
    token = {
      orth: ["Potter"],
      lex: [{ base: ["potter"], ctag: ["PRON"], $: { disamb: "1" } }],
      ann: [
        { _: annotation, $: { chan: TokenType.PERSON } },
        { _: "0", $: { chan: TokenType.PLACE } },
      ],
    };
    wordCounter++;

    lastAnnotation = tokenCreator.createToken(
      wordCounter,
      sentence,
      lastAnnotation,
      token
    );

    annotation = "0";
    token = {
      orth: ["test"],
      lex: [{ base: ["test"], ctag: ["PRON"], $: { disamb: "1" } }],
      ann: [
        { _: annotation, $: { chan: TokenType.PERSON } },
        { _: annotation, $: { chan: TokenType.PLACE } },
      ],
    };
    wordCounter++;

    lastAnnotation = tokenCreator.createToken(
      wordCounter,
      sentence,
      lastAnnotation,
      token
    );

    annotation = "1";
    token = {
      orth: ["Hogwart"],
      lex: [{ base: ["hogwart"], ctag: ["PRON"], $: { disamb: "1" } }],
      ann: [
        { _: "0", $: { chan: TokenType.PERSON } },
        { _: annotation, $: { chan: TokenType.PLACE } },
      ],
    };

    const properToken: Token = {
      name: "hogwart",
      type: TokenType.PLACE,
      tokenIndex: 3,
      tokenGlobalIndex: 3,
    };
    wordCounter++;
    lastAnnotation = tokenCreator.createToken(
      wordCounter,
      sentence,
      lastAnnotation,
      token
    );

    const newToken = sentence.tokens.slice(-1)[0];
    expect(lastAnnotation).toBe(annotation);
    expect(newToken).toStrictEqual(properToken);
  });
});
