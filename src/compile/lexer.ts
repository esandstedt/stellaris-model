import { Token, TokenType } from "./token";

export class Lexer {
  private index: number = 0;
  private regexText = /[a-zA-Z0-9_:.@-]+/y;
  private regexEscaped = /\"(\\\"|[^\"])*\"/y;

  constructor(private text: string) {}

  public getNextToken(): Token {
    while (this.index < this.text.length) {
      const c = this.text.charAt(this.index);

      switch (c) {
        case "\t":
        case "\n":
        case " ":
          this.index += 1;
          continue;
        case "{":
          this.index += 1;
          return {
            type: TokenType.LeftCurly,
            value: ""
          };
        case "}":
          this.index += 1;
          return {
            type: TokenType.RightCurly,
            value: ""
          };
        case "=":
          this.index += 1;
          return {
            type: TokenType.Equals,
            value: ""
          };
        case '"':
          this.regexEscaped.lastIndex = this.index;
          const match = this.regexEscaped.exec(this.text);
          if (match && match.index === this.index) {
            const result = match[0];

            this.index += result.length;

            return {
              type: TokenType.Text,
              value: result.substring(1, result.length - 1)
            };
          }

          throw new Error("could not tokenize");
      }

      this.regexText.lastIndex = this.index;
      const match = this.regexText.exec(this.text);
      if (match && match.index === this.index) {
        const value = match[0];
        this.index += value.length;
        return {
          type: TokenType.Text,
          value
        };
      }

      throw new Error("could not tokenize");
    }

    return {
      type: TokenType.EOF,
      value: ""
    };
  }

  private handleEscapedText(i: number) {
    let j = i + 1;
    while (true) {
      const c = this.text.charAt(j);
      if (c === "\\") {
        // Skip the next character.
        j += 2;
      } else if (c === '"') {
        return this.text.substring(i + 1, j);
      } else {
        j += 1;
      }
    }
  }
}
