import { ChunkListCreator } from "./ChunkListCreator";
import { ChunkCreator } from "./ChunkCreator";
import { Chunk } from "../Models/Chunk";

describe("ChunkListCreator", () => {
  let chunkListCreator: ChunkListCreator;

  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    chunkListCreator = new ChunkListCreator();
  });

  it("should create chunkList of one chunk", () => {
    const spy = jest.spyOn(ChunkCreator.prototype, "createChunk");
    const testChunk: Chunk = {
      sentences: [],
      chunkIndex: 0,
    };
    spy.mockReturnValue(testChunk);
    const NERData =
      '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE chunkList SYSTEM "ccl.dtd"><chunkList><chunk><sentence><tok><orth>Woda</orth><lex disamb="1"><base>Wodo</base><ctag>NOUN</ctag></lex></tok><tok><orth>jest</orth><lex disamb="1"><base>jest</base><ctag>AUX</ctag></lex></tok><tok><orth>jedną</orth><lex disamb="1"><base>jeden</base><ctag>ADJ</ctag></lex></tok><tok><orth>z</orth><lex disamb="1"><base>z</base><ctag>ADP</ctag></lex></tok><tok><orth>najpospolitszych</orth><lex disamb="1"><base>pospolity</base><ctag>ADJ</ctag></lex></tok><tok><orth>substancji</orth><lex disamb="1"><base>substancja</base><ctag>NOUN</ctag></lex></tok><tok><orth>we</orth><lex disamb="1"><base>w</base><ctag>ADP</ctag></lex></tok><tok><orth>Wszechświecie</orth><lex disamb="1"><base>wszechświecie</base><ctag>PROPN</ctag></lex></tok><ns/><tok><orth>.</orth><lex disamb="1"><base>.</base><ctag>PUNCT</ctag></lex></tok></sentence><sentence><tok><orth>Woda</orth><lex disamb="1"><base>Wodo</base><ctag>NOUN</ctag></lex></tok><tok><orth>jest</orth><lex disamb="1"><base>jest</base><ctag>AUX</ctag></lex></tok><tok><orth>jedną</orth><lex disamb="1"><base>jeden</base><ctag>ADJ</ctag></lex></tok><tok><orth>z</orth><lex disamb="1"><base>z</base><ctag>ADP</ctag></lex></tok><tok><orth>najpospolitszych</orth><lex disamb="1"><base>pospolity</base><ctag>ADJ</ctag></lex></tok><tok><orth>substancji</orth><lex disamb="1"><base>substancja</base><ctag>NOUN</ctag></lex></tok><tok><orth>we</orth><lex disamb="1"><base>w</base><ctag>ADP</ctag></lex></tok><tok><orth>Wszechświecie</orth><lex disamb="1"><base>wszechświecie</base><ctag>PROPN</ctag></lex></tok><ns/><tok><orth>.</orth><lex disamb="1"><base>.</base><ctag>PUNCT</ctag></lex></tok></sentence></chunk></chunkList>';
    const chunkList = chunkListCreator.createChunkList(NERData);

    expect(chunkList.length).toBe(1);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should create chunkList of two chunks", () => {
    const spy = jest.spyOn(ChunkCreator.prototype, "createChunk");
    const testChunk: Chunk = {
      sentences: [],
      chunkIndex: 0,
    };
    spy.mockReturnValue(testChunk);
    const NERData =
      '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE chunkList SYSTEM "ccl.dtd"><chunkList><chunk><sentence><tok><orth>Woda</orth><lex disamb="1"><base>Wodo</base><ctag>NOUN</ctag></lex></tok><tok><orth>jest</orth><lex disamb="1"><base>jest</base><ctag>AUX</ctag></lex></tok><tok><orth>jedną</orth><lex disamb="1"><base>jeden</base><ctag>ADJ</ctag></lex></tok><tok><orth>z</orth><lex disamb="1"><base>z</base><ctag>ADP</ctag></lex></tok><tok><orth>najpospolitszych</orth><lex disamb="1"><base>pospolity</base><ctag>ADJ</ctag></lex></tok><tok><orth>substancji</orth><lex disamb="1"><base>substancja</base><ctag>NOUN</ctag></lex></tok><tok><orth>we</orth><lex disamb="1"><base>w</base><ctag>ADP</ctag></lex></tok><tok><orth>Wszechświecie</orth><lex disamb="1"><base>wszechświecie</base><ctag>PROPN</ctag></lex></tok><ns/><tok><orth>.</orth><lex disamb="1"><base>.</base><ctag>PUNCT</ctag></lex></tok></sentence><sentence><tok><orth>Woda</orth><lex disamb="1"><base>Wodo</base><ctag>NOUN</ctag></lex></tok><tok><orth>jest</orth><lex disamb="1"><base>jest</base><ctag>AUX</ctag></lex></tok><tok><orth>jedną</orth><lex disamb="1"><base>jeden</base><ctag>ADJ</ctag></lex></tok><tok><orth>z</orth><lex disamb="1"><base>z</base><ctag>ADP</ctag></lex></tok><tok><orth>najpospolitszych</orth><lex disamb="1"><base>pospolity</base><ctag>ADJ</ctag></lex></tok><tok><orth>substancji</orth><lex disamb="1"><base>substancja</base><ctag>NOUN</ctag></lex></tok><tok><orth>we</orth><lex disamb="1"><base>w</base><ctag>ADP</ctag></lex></tok><tok><orth>Wszechświecie</orth><lex disamb="1"><base>wszechświecie</base><ctag>PROPN</ctag></lex></tok><ns/><tok><orth>.</orth><lex disamb="1"><base>.</base><ctag>PUNCT</ctag></lex></tok></sentence></chunk><chunk><sentence><tok><orth>Woda</orth><lex disamb="1"><base>Wodo</base><ctag>NOUN</ctag></lex></tok><tok><orth>jest</orth><lex disamb="1"><base>jest</base><ctag>AUX</ctag></lex></tok><tok><orth>jedną</orth><lex disamb="1"><base>jeden</base><ctag>ADJ</ctag></lex></tok><tok><orth>z</orth><lex disamb="1"><base>z</base><ctag>ADP</ctag></lex></tok><tok><orth>najpospolitszych</orth><lex disamb="1"><base>pospolity</base><ctag>ADJ</ctag></lex></tok><tok><orth>substancji</orth><lex disamb="1"><base>substancja</base><ctag>NOUN</ctag></lex></tok><tok><orth>we</orth><lex disamb="1"><base>w</base><ctag>ADP</ctag></lex></tok><tok><orth>Wszechświecie</orth><lex disamb="1"><base>wszechświecie</base><ctag>PROPN</ctag></lex></tok><ns/><tok><orth>.</orth><lex disamb="1"><base>.</base><ctag>PUNCT</ctag></lex></tok></sentence><sentence><tok><orth>Woda</orth><lex disamb="1"><base>Wodo</base><ctag>NOUN</ctag></lex></tok><tok><orth>jest</orth><lex disamb="1"><base>jest</base><ctag>AUX</ctag></lex></tok><tok><orth>jedną</orth><lex disamb="1"><base>jeden</base><ctag>ADJ</ctag></lex></tok><tok><orth>z</orth><lex disamb="1"><base>z</base><ctag>ADP</ctag></lex></tok><tok><orth>najpospolitszych</orth><lex disamb="1"><base>pospolity</base><ctag>ADJ</ctag></lex></tok><tok><orth>substancji</orth><lex disamb="1"><base>substancja</base><ctag>NOUN</ctag></lex></tok><tok><orth>we</orth><lex disamb="1"><base>w</base><ctag>ADP</ctag></lex></tok><tok><orth>Wszechświecie</orth><lex disamb="1"><base>wszechświecie</base><ctag>PROPN</ctag></lex></tok><ns/><tok><orth>.</orth><lex disamb="1"><base>.</base><ctag>PUNCT</ctag></lex></tok></sentence></chunk></chunkList>';
    const chunkList = chunkListCreator.createChunkList(NERData);

    expect(chunkList.length).toBe(2);
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
