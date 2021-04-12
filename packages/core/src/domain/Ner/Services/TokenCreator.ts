import { Token } from "../Models/Token";
import { Sentence } from "../Models/Sentence";
import { XMLToken } from "../Constants";
import { Service } from "typedi";
import { TokenType } from "../Models/TokenType";

@Service()
export class TokenCreator {
  private wordGlobalCounter = 0;

  public createToken(
    wordCounter: number,
    sentence: Sentence,
    lastAnnotation: string,
    token: XMLToken
  ): string {
    this.wordGlobalCounter++;
    if (token.hasOwnProperty("ann")) {
      for (const annotation of token.ann) {
        if (annotation._ !== "0") {
          const type = this.getTokenType(annotation.$.chan);
          const name = token.lex[0].base[0];
          const lastToken = sentence.tokens.slice(-1)[0];
          if (
            lastToken &&
            annotation._ === lastAnnotation &&
            type === lastToken.type
          ) {
            const lastToken = sentence.tokens.pop() as Token;
            lastToken.name = lastToken.name + " " + name;
            sentence.tokens.push(lastToken);
          } else {
            const newToken: Token = {
              tokenIndex: wordCounter,
              tokenGlobalIndex: this.wordGlobalCounter - 1,
              name: name,
              type: type,
            };
            sentence.tokens.push(newToken);
          }
          return annotation._;
        }
      }
    }
    return "0";
  }

  public reset(): void {
    this.wordGlobalCounter = 0;
  }

  private getTokenType(type: string): TokenType {
    if (type === TokenType.LOCATION) return TokenType.LOCATION;
    else if (type === TokenType.PLACE) return TokenType.PLACE;
    else if (type === TokenType.ORGANIZATION) return TokenType.ORGANIZATION;
    else return TokenType.PERSON;
  }
}
