import { TokenType } from "./TokenType";

export interface Token {
  name: string;
  type: TokenType;
  tokenIndex: number;
  tokenGlobalIndex: number;
}
