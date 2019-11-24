import { asDictionary, asString, Pair } from "../compile";
import { Coordinate } from "./interfaces";

export class CoordinateImpl implements Coordinate {
  public x: number;
  public y: number;

  constructor(pairs: Pair[]) {
    const data = asDictionary(pairs);

    this.x = parseFloat(asString(data.x));
    this.y = parseFloat(asString(data.y));
  }
}
