import { loadAsync } from "jszip";
import { Lexer } from "./lexer";
import { Parser } from "./parser";

export { asArray, asDictionary, asString, asPairArray } from "./parser";
export { Pair } from "./pair";

function readSavefileAsText(data: string | ArrayBuffer | Blob) {
  return loadAsync(data)
    .then(zip => zip.files["gamestate"])
    .then(obj => obj.async("text"));
}

export function compile(data: string | ArrayBuffer | Blob) {
  return readSavefileAsText(data).then(text => {
    const lexer = new Lexer(text);
    const parser = new Parser(lexer);
    return parser.parse();
  });
}
