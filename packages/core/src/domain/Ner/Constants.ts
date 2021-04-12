export const enum APIUrls {
  UPLOAD = "upload/",
  START = "startTask/",
  RESULT = "download",
  STATUS = "getStatus/",
}

export const enum Status {
  PROCESSING = "PROCESSING",
  DONE = "DONE",
  ERROR = "ERROR",
}

export const baseURL = "https://ws.clarin-pl.eu/nlprest2/base/";

export type XMLLex = {
  base: Array<string>;
  ctag: Array<string>;
  $: {
    disamb: string;
  };
};

export type XMLAnn = {
  _: string;
  $: {
    chan: string;
  };
};

export type XMLToken = {
  orth: Array<string>;
  lex: Array<XMLLex>;
  ann: Array<XMLAnn>;
};

export type XMLSentence = {
  tok: Array<XMLToken>;
};

export type XMLChunk = {
  sentence: Array<XMLSentence>;
};

export type XMLChunkList = {
  chunk: Array<XMLChunk>;
};

export type XML = {
  chunkList: XMLChunkList;
};
