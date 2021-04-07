import { Pair } from ".";
import { Lexer } from "./lexer";
import { Token, TokenType } from "./token";

export function asString(input: Pair[] | string): string {
  if (typeof input === "string") {
    return input;
  } else if (typeof input === "undefined") {
    return "";
  } else {
    throw new Error("Could not convert pair array to string.");
  }
}

export function asPairArray(input: Pair[] | string): Pair[] {
  if (typeof input === "undefined") {
    return [];
  } else if (typeof input === "string") {
    throw new Error("Could not convert string to pair array.");
  } else {
    return input;
  }
}

export function asDictionary(
  input: Pair[] | string
): { [key: string]: Pair[] | string } {
  const result: { [key: string]: Pair[] | string } = {};
  const keyCounts: { [key: string]: number } = {};

  asPairArray(input).forEach(pair => {
    if (pair.key === null) {
      throw new Error(
        "Can't create dictionary from pair list with any null keys."
      );
    }

    if (typeof keyCounts[pair.key] === "undefined") {
      keyCounts[pair.key] = 0;
    }

    if (keyCounts[pair.key] === 0) {
      result[pair.key] = pair.value;
    } else if (keyCounts[pair.key] === 1) {
      result[pair.key] = [
        new Pair(null, result[pair.key]),
        new Pair(null, pair.value)
      ];
    } else {
      (result[pair.key] as Pair[]).push(new Pair(null, pair.value));
    }

    keyCounts[pair.key] += 1;
  });

  return result;
}

export function asArray(
  input: Pair[] | string,
  key: string | null = null
): Array<Pair[] | string> {
  const pairs = asPairArray(input);

  const hasInvalidKeys = pairs.some(pair => pair.key !== key);
  if (hasInvalidKeys) {
    throw new Error("Can't create array from pair list with invalid keys.");
  }

  return pairs.map(pair => pair.value);
}

export class Parser {
  private token: Token;
  constructor(private lexer: Lexer) {
    this.token = this.lexer.getNextToken();
  }

  public parse(): Pair[] {
    const pairs: Pair[] = [];
    while (this.token.type !== TokenType.EOF) {
      pairs.push(this.parsePair());
    }
    return pairs;
  }

  private parsePair(): Pair {
    if (this.token.type === TokenType.Text) {
      const keyOrValue = this.token.value;
      this.token = this.lexer.getNextToken();
      if (this.token.type === TokenType.Equals) {
        this.token = this.lexer.getNextToken();
        if (this.token.type === TokenType.Text) {
          const value = this.token.value;
          this.token = this.lexer.getNextToken();
          return new Pair(keyOrValue, value);
        } else if (this.token.type === TokenType.LeftCurly) {
          return new Pair(keyOrValue, this.parseObject());
        } else {
          throw new Error("could not parse");
        }
      } else {
        return new Pair(null, keyOrValue);
      }
    } else if (this.token.type === TokenType.LeftCurly) {
      return new Pair(null, this.parseObject());
    } else {
      throw new Error("could not parse");
    }
  }

  private parseObject(): Pair[] {
    this.token = this.lexer.getNextToken();
    const pairs: Pair[] = [];
    while (this.token.type !== TokenType.RightCurly) {
      pairs.push(this.parsePair());
    }
    this.token = this.lexer.getNextToken();
    return pairs;
  }
}
