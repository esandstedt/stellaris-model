import { ModelImpl, Model } from "./model";
import { compile } from "./compile";

export { Model } from "./model";
export { Coordinate } from "./model/coordinate";
export { Country } from "./model/country";
export { Faction } from "./model/faction";
export { Leader } from "./model/leader";
export { Planet } from "./model/planet";
export { Player } from "./model/player";
export { Pop } from "./model/pop";
export { Species } from "./model/species";
export { System, Hyperlane } from "./model/system";

export function from(data: string | ArrayBuffer | Blob): Promise<Model> {
  return compile(data).then(doc => new ModelImpl(doc));
}
