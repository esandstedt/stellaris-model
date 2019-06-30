import { Lexer, Token } from "./lexer";

class Pair {
  constructor(public key: string | null, public value: any) {}
}

export class Parser {
  token: Token;
  constructor(private lexer: Lexer) {
    this.token = this.lexer.getNextToken();
  }

  public parse(): Element {
    const pairs = [];
    while (this.token.type !== "eof") {
      pairs.push(this.parsePair());
    }
    return this.convertPairs(pairs);
  }

  private parsePair(): Pair {
    if (this.token.type === "text") {
      const keyOrValue = this.token.value;
      this.token = this.lexer.getNextToken();
      if (this.token.type === "=") {
        this.token = this.lexer.getNextToken();
        if (this.token.type === "text") {
          const value = this.token.value;
          this.token = this.lexer.getNextToken();
          return new Pair(keyOrValue, value);
        } else if (this.token.type === "{") {
          return new Pair(keyOrValue, this.parseObject());
        } else {
          throw new Error("could not parse");
        }
      } else {
        return new Pair(null, keyOrValue);
      }
    } else if (this.token.type === "{") {
      return new Pair(null, this.parseObject());
    } else {
      throw new Error("could not parse");
    }
  }

  private parseObject(): any {
    this.token = this.lexer.getNextToken();
    const pairs = [];
    while (this.token.type !== "}") {
      pairs.push(this.parsePair());
    }
    this.token = this.lexer.getNextToken();
    return this.convertPairs(pairs);
  }

  private convertPairs(pairs: Pair[]): any {
    if (pairs.length === 0) {
      return [];
    }

    const isList = pairs.every(p => p.key === null);
    const isObject = pairs.every(p => p.key !== null);

    if (isList) {
      return pairs.map(p => p.value);
    } else if (isObject) {
      const obj: { [key: string]: any } = {};

      pairs.forEach(p => {
        const key = <string>p.key;
        if (obj.hasOwnProperty(key)) {
          obj[key].push(p.value);
        } else {
          obj[key] = [p.value];
        }
      });

      Object.keys(obj).forEach(key => {
        const value = obj[key];
        if (value.length === 1) {
          obj[key] = value[0];
        }
      });

      return obj;
    } else {
      throw new Error("could not convert pairs");
    }
  }
}
