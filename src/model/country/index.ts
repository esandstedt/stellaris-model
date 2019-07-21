import { asDictionary, Pair, asString, asPairArray } from "../../compile";
import { Planet } from "../planet";
import { Faction } from "../faction";
import { Leader } from "../leader";
import { Flag } from "./flag";
import { Starbase } from "../starbase";

export interface Country {
  id: string;
  controlledPlanets: Planet[];
  factions: Faction[];
  flag: Flag;
  fleetSize: number;
  leaders: Leader[];
  name: string;
  ownedPlanets: Planet[];
  starbases: Starbase[];
}

export class CountryImpl implements Country {
  public controlledPlanets: Planet[] = [];
  public factions: Faction[] = [];
  public flag: Flag;
  public fleetSize: number;
  public leaders: Leader[] = [];
  public name: string;
  public ownedPlanets: Planet[] = [];
  public starbases: Starbase[] = [];

  constructor(public id: string, pairs: Pair[]) {
    const data = asDictionary(pairs);

    this.flag = new Flag(asPairArray(data["flag"]));
    this.fleetSize = parseInt(asString(data["fleet_size"]), 10);
    this.name = asString(data["name"]);
  }
}
