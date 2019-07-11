import fs from "fs";

import { ModelImpl, Model } from "./model";
import { compile } from "./compile";

export { Model } from "./model";
export { Collection } from "./model/collection";
export { Coordinate } from "./model/coordinate";
export { Country } from "./model/country";
export { Faction } from "./model/faction";
export { Leader } from "./model/leader";
export { Planet } from "./model/planet";
export { Player } from "./model/player";
export { Pop } from "./model/pop";
export { Species } from "./model/species";
export { System } from "./model/system";
export { Hyperlane } from "./model/system/hyperlane";

export function load(path: string): Promise<Model> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, async (err, data) => {
      if (err) {
        reject(err);
      }
      const pairs = await compile(data.buffer);
      const model = new ModelImpl(pairs);
      resolve(model);
    });
  });
}
