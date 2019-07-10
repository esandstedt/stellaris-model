import { Coordinate } from "../coordinate";
import {
  asDictionary,
  Pair,
  asString,
  asPairArray,
  asArray
} from "../../compile";
import { Planet } from "../planet";
import { Hyperlane } from "../..";

export interface System {
  id: string;
  coordinate: Coordinate;
  hyperlanes: Hyperlane[];
  name: string;
  planets: Planet[];
  starClass: string;
  type: string;
}

export class SystemImpl implements System {
  public coordinate: Coordinate;
  public hyperlanes: Hyperlane[] = [];
  public name: string;
  public planets: Planet[] = [];
  public starClass: string;
  public type: string;

  constructor(public id: string, pairs: Pair[]) {
    const data = asDictionary(pairs);

    this.coordinate = new Coordinate(asPairArray(data["coordinate"]));
    this.type = asString(data["type"]);
    this.name = asString(data["name"]);
    this.starClass = asString(data["star_class"]);
  }
}
