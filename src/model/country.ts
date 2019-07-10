import { asDictionary, Pair, asString } from "../compile";
import { Planet } from "./planet";
import { Faction } from "./faction";
import { Leader } from "./leader";

export interface Country {
  id: string;
  controlledPlanets: Planet[];
  factions: Faction[];
  fleetSize: number;
  leaders: Leader[];
  name: string;
  ownedPlanets: Planet[];
}

export class CountryImpl implements Country {
  public controlledPlanets: Planet[] = [];
  public factions: Faction[] = [];
  public fleetSize: number;
  public leaders: Leader[] = [];
  public name: string;
  public ownedPlanets: Planet[] = [];

  constructor(public id: string, pairs: Pair[]) {
    const data = asDictionary(pairs);

    this.fleetSize = parseInt(asString(data["fleet_size"]), 10);
    this.name = asString(data["name"]);
  }
}
