import { Token } from "./token";

export class Lexer {
  private index: number = 0;

  constructor(private text: string) {}

  public getNextToken(): Token {
    while (this.index < this.text.length) {
      const c = this.text.charAt(this.index);

      if (this.isWhitespace(c)) {
        this.index += 1;
      } else if (this.isLiteral(c)) {
        this.index += 1;
        return new Token(c);
      } else if (this.isText(c)) {
        const value = this.handleText(this.index);
        this.index += value.length;
        return new Token("text", value);
      } else if (this.isDoubleQuote(c)) {
        const value = this.handleEscapedText(this.index);
        this.index += value.length + 2;
        return new Token("text", value);
      } else {
        throw new Error("could not tokenize");
      }
    }

    return new Token("eof");
  }

  private handleText(i: number) {
    let j = i + 1;
    while (this.isText(this.text.charAt(j))) {
      j += 1;
    }

    return this.text.substring(i, j);
  }

  private handleEscapedText(i: number) {
    let j = i + 1;
    while (true) {
      const c = this.text.charAt(j);
      if (this.isEscape(c)) {
        // Skip the next character.
        j += 2;
      } else if (this.isDoubleQuote(c)) {
        return this.text.substring(i + 1, j);
      } else {
        j += 1;
      }
    }
  }

  private isWhitespace(c: string) {
    return c === "\t" || c === "\n" || c === " ";
  }

  private isLiteral(c: string) {
    return c === "{" || c === "}" || c === "=";
  }

  private isText(c: string) {
    return (
      (c >= "a" && c <= "z") ||
      (c >= "A" && c <= "Z") ||
      (c >= "0" && c <= "9") ||
      c === "_" ||
      c === ":" ||
      c === "." ||
      c === "@" ||
      c === "-"
    );
  }

  private isEscape(c: string) {
    return c === "\\";
  }

  private isDoubleQuote(c: string) {
    return c === '"';
  }
}
