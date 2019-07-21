import { Coordinate } from "../coordinate";
import { asDictionary, Pair, asString, asPairArray } from "../../compile";
import { Planet } from "../planet";
import { Hyperlane } from "../..";
import { Starbase } from "../starbase";

export interface System {
  id: string;
  coordinate: Coordinate;
  hyperlanes: Hyperlane[];
  name: string;
  planets: Planet[];
  starbase: Starbase | undefined;
  starClass: string;
  type: string;
}

export class SystemImpl implements System {
  public coordinate: Coordinate;
  public hyperlanes: Hyperlane[] = [];
  public name: string;
  public planets: Planet[] = [];
  public starbaseId: string | undefined;
  public starbase: Starbase | undefined;
  public starClass: string;
  public type: string;

  constructor(public id: string, pairs: Pair[]) {
    const data = asDictionary(pairs);

    this.coordinate = new Coordinate(asPairArray(data["coordinate"]));
    this.type = asString(data["type"]);
    this.name = asString(data["name"]);

    const starbaseId = asString(data["starbase"]);
    if (starbaseId !== "4294967295") {
      this.starbaseId = starbaseId;
    }

    this.starClass = asString(data["star_class"]);
  }
}
