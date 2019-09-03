import { loadAsync } from "jszip";

import { Lexer } from "./lexer";
import { Parser } from "./parser";
import { Pair } from "./pair";

export { asArray, asDictionary, asString, asPairArray } from "./parser";
export { Pair } from "./pair";

export async function compile(dataOrBuffer: string | Buffer): Promise<Pair[]> {
  const zip = await loadAsync(dataOrBuffer);
  const text = await zip.files["gamestate"].async("text");
  const lexer = new Lexer(text);
  const parser = new Parser(lexer);
  return parser.parse();
}
