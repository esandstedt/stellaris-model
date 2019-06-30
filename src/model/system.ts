import { Coordinate } from "./coordinate";
import { asDictionary, Pair, asString, asPairArray, asArray } from "../compile";

export class System {
  coordinate: Coordinate;
  type: string;
  name: string;
  starClass: string;

  hyperlanes: Hyperlane[];

  constructor(public id: string, pairs: Pair[]) {
    var data = asDictionary(pairs);

    this.coordinate = new Coordinate(asPairArray(data["coordinate"]));
    this.type = asString(data["type"]);
    this.name = asString(data["name"]);
    this.starClass = asString(data["star_class"]);

    this.hyperlanes = [];
  }
}

export class Hyperlane {
  constructor(public from: System, public to: System, public length: number) {}
}
