import fs from "fs";
import { loadAsync } from "jszip";

import { Lexer } from "./lexer";
import { Parser } from "./parser";
import { Pair } from "./pair";

export { asArray, asDictionary, asString, asPairArray } from "./parser";
export { Pair } from "./pair";

export function compile(path: string): Promise<Pair[]> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, async (error, data) => {
      if (error) {
        reject(error);
      }

      const zip = await loadAsync(data.buffer);
      const text = await zip.files["gamestate"].async("text");
      const lexer = new Lexer(text);
      const parser = new Parser(lexer);
      const pairs = parser.parse();

      resolve(pairs);
    });
  });
}
