import { asDictionary, asString, Pair } from "../compile";

export class Coordinate {
  public x: number;
  public y: number;

  constructor(pairs: Pair[]) {
    const data = asDictionary(pairs);

    this.x = parseFloat(asString(data["x"]));
    this.y = parseFloat(asString(data["y"]));
  }
}
