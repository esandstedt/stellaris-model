import { asDictionary, asString, Pair } from "../compile";

export class Coordinate {
  x: number;
  y: number;

  constructor(pairs: Pair[]) {
    var data = asDictionary(pairs);

    this.x = parseFloat(asString(data["x"]));
    this.y = parseFloat(asString(data["y"]));
  }
}
