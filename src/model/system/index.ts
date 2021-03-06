import { asDictionary, asPairArray, asString, Pair } from "../../compile";
import { CoordinateImpl } from "../coordinate";
import {
  Hyperlane,
  Megastructure,
  Planet,
  Sector,
  Starbase,
  System
} from "../interfaces";

export class SystemImpl implements System {
  public coordinate: CoordinateImpl;
  public hyperlanes: Hyperlane[] = [];
  public megastructures: Megastructure[] = [];
  public name: string;
  public planets: Planet[] = [];
  public sectorId: string | undefined;
  public sector: Sector | undefined;
  public starbaseId: string | undefined;
  public starbase: Starbase | undefined;
  public starClass: string;
  public type: string;

  constructor(public id: string, pairs: Pair[]) {
    const data = asDictionary(pairs);

    this.coordinate = new CoordinateImpl(asPairArray(data.coordinate));
    this.name = asString(data.name);

    if (typeof data.sector !== "undefined") {
      this.sectorId = asString(data.sector);
    }

    const starbaseId = asString(data.starbase);
    if (starbaseId !== "4294967295") {
      this.starbaseId = starbaseId;
    }

    this.starClass = asString(data.star_class);
    this.type = asString(data.type);
  }
}
