import { TokenType } from "../Constants";

export interface Token {
  name: string;
  type: TokenType;
  tokenIndex: number;
  tokenGlobalIndex: number;
}
