import { loadAsync } from "jszip";

import { Lexer } from "./lexer";
import { Pair } from "./pair";
import { Parser } from "./parser";

export { asArray, asDictionary, asString, asPairArray } from "./parser";
export { Pair } from "./pair";

export async function compile(dataOrBuffer: string | Buffer): Promise<Pair[]> {
  const zip = await loadAsync(dataOrBuffer);

  if (!zip.files.gamestate) {
    throw new Error("Could not find 'gamestate' in the zip file.");
  }

  const text = await zip.files.gamestate.async("text");
  const lexer = new Lexer(text);
  const parser = new Parser(lexer);
  return parser.parse();
}
