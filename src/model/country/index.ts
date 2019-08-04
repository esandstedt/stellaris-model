import { asDictionary, Pair, asString, asPairArray } from "../../compile";
import { FlagImpl } from "./flag";
import {
  Country,
  Faction,
  Leader,
  Planet,
  Starbase,
  Fleet
} from "../interfaces";

export class CountryImpl implements Country {
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
  public starbases: Starbase[] = [];
  public subjects: Country[] = [];

  constructor(public id: string, pairs: Pair[]) {
    const data = asDictionary(pairs);

    if (data["overlord"]) {
      this.overlordId = asString(data["overlord"]);
    }

    this.flag = new FlagImpl(asPairArray(data["flag"]));
    this.fleetSize = parseInt(asString(data["fleet_size"]), 10);
    this.name = asString(data["name"]);
  }
}
