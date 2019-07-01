import { Lexer, Token } from "./lexer";

export class Pair {
  constructor(public key: string | null, public value: Pair[] | string) {}
}

export function asString(pairsOrString: Pair[] | string): string {
  if (typeof pairsOrString === "undefined") {
    throw new Error("Could not convert undefined to string.");
  } else if (typeof pairsOrString === "string") {
    return pairsOrString;
  } else {
    throw new Error("Could not convert pair array to string.");
  }
}

export function asPairArray(pairsOrString: Pair[] | string): Pair[] {
  if (typeof pairsOrString === "undefined") {
    throw new Error("Could not convert undefined to pair array.");
  } else if (typeof pairsOrString === "string") {
    throw new Error("Could not convert string to pair array.");
  } else {
    return pairsOrString;
  }
}

export function asDictionary(
  pairs: Pair[]
): { [key: string]: Pair[] | string } {
  const result: { [key: string]: Pair[] | string } = {};

  pairs.forEach(pair => {
    if (pair.key === null) {
      throw new Error(
        "Can't create dictionary from pair list with any null keys."
      );
    } else {
      result[pair.key] = pair.value;
    }
  });

  return result;
}

export function asArray(
  pairs: Pair[],
  key: string | null = null
): (Pair[] | string)[] {
  const hasKeys = pairs.some(pair => pair.key !== key);
  if (hasKeys) {
    throw new Error("Can't create array from pair list with invalid keys.");
  }
  return pairs.map(pair => pair.value);
}

export class Parser {
  token: Token;
  constructor(private lexer: Lexer) {
    this.token = this.lexer.getNextToken();
  }

  public parse(): Pair[] {
    const pairs: Pair[] = [];
    while (this.token.type !== "eof") {
      pairs.push(this.parsePair());
    }
    return pairs;
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

  private parseObject(): Pair[] {
    this.token = this.lexer.getNextToken();
    const pairs: Pair[] = [];
    while (this.token.type !== "}") {
      pairs.push(this.parsePair());
    }
    this.token = this.lexer.getNextToken();
    return pairs;
  }
}
