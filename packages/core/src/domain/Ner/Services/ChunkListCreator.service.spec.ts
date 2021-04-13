import { ChunkListCreator } from "./ChunkListCreator.service";
import { ChunkCreator } from "./ChunkCreator.service";
import { Chunk } from "../Models/Chunk";
import { SentenceCreator } from "./SentenceCreator.service";
jest.mock("./ChunkCreator.service");

describe("ChunkListCreator", () => {
  const mockChunkCreator = new ChunkCreator(
    {} as SentenceCreator
  ) as jest.Mocked<ChunkCreator>;
  const chunkListCreator = new ChunkListCreator(mockChunkCreator);

  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    chunkListCreator.reset();
  });

  it("should create chunkList of one chunk", () => {
    const testChunk: Chunk = {
      sentences: [],
      chunkIndex: 0,
    };
    mockChunkCreator.createChunk.mockReturnValue(testChunk);
    const NERData =
      '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE chunkList SYSTEM "ccl.dtd"><chunkList><chunk><sentence><tok><orth>Woda</orth><lex disamb="1"><base>Wodo</base><ctag>NOUN</ctag></lex></tok><tok><orth>jest</orth><lex disamb="1"><base>jest</base><ctag>AUX</ctag></lex></tok><tok><orth>jedną</orth><lex disamb="1"><base>jeden</base><ctag>ADJ</ctag></lex></tok><tok><orth>z</orth><lex disamb="1"><base>z</base><ctag>ADP</ctag></lex></tok><tok><orth>najpospolitszych</orth><lex disamb="1"><base>pospolity</base><ctag>ADJ</ctag></lex></tok><tok><orth>substancji</orth><lex disamb="1"><base>substancja</base><ctag>NOUN</ctag></lex></tok><tok><orth>we</orth><lex disamb="1"><base>w</base><ctag>ADP</ctag></lex></tok><tok><orth>Wszechświecie</orth><lex disamb="1"><base>wszechświecie</base><ctag>PROPN</ctag></lex></tok><ns/><tok><orth>.</orth><lex disamb="1"><base>.</base><ctag>PUNCT</ctag></lex></tok></sentence><sentence><tok><orth>Woda</orth><lex disamb="1"><base>Wodo</base><ctag>NOUN</ctag></lex></tok><tok><orth>jest</orth><lex disamb="1"><base>jest</base><ctag>AUX</ctag></lex></tok><tok><orth>jedną</orth><lex disamb="1"><base>jeden</base><ctag>ADJ</ctag></lex></tok><tok><orth>z</orth><lex disamb="1"><base>z</base><ctag>ADP</ctag></lex></tok><tok><orth>najpospolitszych</orth><lex disamb="1"><base>pospolity</base><ctag>ADJ</ctag></lex></tok><tok><orth>substancji</orth><lex disamb="1"><base>substancja</base><ctag>NOUN</ctag></lex></tok><tok><orth>we</orth><lex disamb="1"><base>w</base><ctag>ADP</ctag></lex></tok><tok><orth>Wszechświecie</orth><lex disamb="1"><base>wszechświecie</base><ctag>PROPN</ctag></lex></tok><ns/><tok><orth>.</orth><lex disamb="1"><base>.</base><ctag>PUNCT</ctag></lex></tok></sentence></chunk></chunkList>';
    const chunkList = chunkListCreator.createChunkList(NERData);

    expect(chunkList.length).toBe(1);
    expect(mockChunkCreator.createChunk).toHaveBeenCalled();
  });

  it("should create chunkList of two chunks", () => {
    const testChunk: Chunk = {
      sentences: [],
      chunkIndex: 0,
    };
    mockChunkCreator.createChunk.mockReturnValue(testChunk);
    const NERData =
      '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE chunkList SYSTEM "ccl.dtd"><chunkList><chunk><sentence><tok><orth>Woda</orth><lex disamb="1"><base>Wodo</base><ctag>NOUN</ctag></lex></tok><tok><orth>jest</orth><lex disamb="1"><base>jest</base><ctag>AUX</ctag></lex></tok><tok><orth>jedną</orth><lex disamb="1"><base>jeden</base><ctag>ADJ</ctag></lex></tok><tok><orth>z</orth><lex disamb="1"><base>z</base><ctag>ADP</ctag></lex></tok><tok><orth>najpospolitszych</orth><lex disamb="1"><base>pospolity</base><ctag>ADJ</ctag></lex></tok><tok><orth>substancji</orth><lex disamb="1"><base>substancja</base><ctag>NOUN</ctag></lex></tok><tok><orth>we</orth><lex disamb="1"><base>w</base><ctag>ADP</ctag></lex></tok><tok><orth>Wszechświecie</orth><lex disamb="1"><base>wszechświecie</base><ctag>PROPN</ctag></lex></tok><ns/><tok><orth>.</orth><lex disamb="1"><base>.</base><ctag>PUNCT</ctag></lex></tok></sentence><sentence><tok><orth>Woda</orth><lex disamb="1"><base>Wodo</base><ctag>NOUN</ctag></lex></tok><tok><orth>jest</orth><lex disamb="1"><base>jest</base><ctag>AUX</ctag></lex></tok><tok><orth>jedną</orth><lex disamb="1"><base>jeden</base><ctag>ADJ</ctag></lex></tok><tok><orth>z</orth><lex disamb="1"><base>z</base><ctag>ADP</ctag></lex></tok><tok><orth>najpospolitszych</orth><lex disamb="1"><base>pospolity</base><ctag>ADJ</ctag></lex></tok><tok><orth>substancji</orth><lex disamb="1"><base>substancja</base><ctag>NOUN</ctag></lex></tok><tok><orth>we</orth><lex disamb="1"><base>w</base><ctag>ADP</ctag></lex></tok><tok><orth>Wszechświecie</orth><lex disamb="1"><base>wszechświecie</base><ctag>PROPN</ctag></lex></tok><ns/><tok><orth>.</orth><lex disamb="1"><base>.</base><ctag>PUNCT</ctag></lex></tok></sentence></chunk><chunk><sentence><tok><orth>Woda</orth><lex disamb="1"><base>Wodo</base><ctag>NOUN</ctag></lex></tok><tok><orth>jest</orth><lex disamb="1"><base>jest</base><ctag>AUX</ctag></lex></tok><tok><orth>jedną</orth><lex disamb="1"><base>jeden</base><ctag>ADJ</ctag></lex></tok><tok><orth>z</orth><lex disamb="1"><base>z</base><ctag>ADP</ctag></lex></tok><tok><orth>najpospolitszych</orth><lex disamb="1"><base>pospolity</base><ctag>ADJ</ctag></lex></tok><tok><orth>substancji</orth><lex disamb="1"><base>substancja</base><ctag>NOUN</ctag></lex></tok><tok><orth>we</orth><lex disamb="1"><base>w</base><ctag>ADP</ctag></lex></tok><tok><orth>Wszechświecie</orth><lex disamb="1"><base>wszechświecie</base><ctag>PROPN</ctag></lex></tok><ns/><tok><orth>.</orth><lex disamb="1"><base>.</base><ctag>PUNCT</ctag></lex></tok></sentence><sentence><tok><orth>Woda</orth><lex disamb="1"><base>Wodo</base><ctag>NOUN</ctag></lex></tok><tok><orth>jest</orth><lex disamb="1"><base>jest</base><ctag>AUX</ctag></lex></tok><tok><orth>jedną</orth><lex disamb="1"><base>jeden</base><ctag>ADJ</ctag></lex></tok><tok><orth>z</orth><lex disamb="1"><base>z</base><ctag>ADP</ctag></lex></tok><tok><orth>najpospolitszych</orth><lex disamb="1"><base>pospolity</base><ctag>ADJ</ctag></lex></tok><tok><orth>substancji</orth><lex disamb="1"><base>substancja</base><ctag>NOUN</ctag></lex></tok><tok><orth>we</orth><lex disamb="1"><base>w</base><ctag>ADP</ctag></lex></tok><tok><orth>Wszechświecie</orth><lex disamb="1"><base>wszechświecie</base><ctag>PROPN</ctag></lex></tok><ns/><tok><orth>.</orth><lex disamb="1"><base>.</base><ctag>PUNCT</ctag></lex></tok></sentence></chunk></chunkList>';
    const chunkList = chunkListCreator.createChunkList(NERData);

    expect(chunkList.length).toBe(2);
    expect(mockChunkCreator.createChunk).toHaveBeenCalledTimes(2);
  });
});
