import { asDictionary, Pair, asString } from "../compile";
import { Planet } from "./planet";
import { Faction } from "./faction";
import { Leader } from "./leader";

export class Country {
  public fleetSize: number;
  public name: string;

  public leaders: Leader[] = [];
  public factions: Faction[] = [];
  public ownedPlanets: Planet[] = [];
  public controlledPlanets: Planet[] = [];

  constructor(public id: string, pairs: Pair[]) {
    var data = asDictionary(pairs);

    this.fleetSize = parseInt(asString(data["fleet_size"]));
    this.name = asString(data["name"]);
  }
}
