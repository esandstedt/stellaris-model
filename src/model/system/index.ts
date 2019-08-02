import { CoordinateImpl } from "../coordinate";
import { asDictionary, Pair, asString, asPairArray } from "../../compile";
import { Hyperlane, Planet, Starbase, System } from "../interfaces";

export class SystemImpl implements System {
  public coordinate: CoordinateImpl;
  public hyperlanes: Hyperlane[] = [];
  public name: string;
  public planets: Planet[] = [];
  public starbaseId: string | undefined;
  public starbase: Starbase | undefined;
  public starClass: string;
  public type: string;

  constructor(public id: string, pairs: Pair[]) {
    const data = asDictionary(pairs);

    this.coordinate = new CoordinateImpl(asPairArray(data["coordinate"]));
    this.type = asString(data["type"]);
    this.name = asString(data["name"]);

    const starbaseId = asString(data["starbase"]);
    if (starbaseId !== "4294967295") {
      this.starbaseId = starbaseId;
    }

    this.starClass = asString(data["star_class"]);
  }
}
