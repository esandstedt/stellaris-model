import { asDictionary, Pair, asString, asPairArray } from "../../compile";
import { FlagImpl } from "./flag";
import {
  Country,
  Faction,
  Leader,
  Planet,
  Starbase,
  Fleet,
  Army,
  Sector
} from "../interfaces";

export class CountryImpl implements Country {
  public armies: Army[] = [];
  public capitalId: string | undefined;
  public capital: Planet | undefined;
  public controlledPlanets: Planet[] = [];
  public factions: Faction[] = [];
  public flag: FlagImpl;
  public fleets: Fleet[] = [];
  public fleetSize: number;
  public leaders: Leader[] = [];
  public name: string;
  public overlordId: string | undefined;
  public overlord: Country | undefined;
  public ownedPlanets: Planet[] = [];
  public sectors: Sector[] = [];
  public starbases: Starbase[] = [];
  public subjects: Country[] = [];

  constructor(public id: string, pairs: Pair[]) {
    const data = asDictionary(pairs);

    if (typeof data["capital"] !== "undefined") {
      this.capitalId = asString(data["capital"]);
    }

    if (data["overlord"]) {
      this.overlordId = asString(data["overlord"]);
    }

    this.flag = new FlagImpl(asPairArray(data["flag"]));
    this.fleetSize = parseInt(asString(data["fleet_size"]), 10);
    this.name = asString(data["name"]);
  }
}
