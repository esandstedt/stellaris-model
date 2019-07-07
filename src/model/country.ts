import { asDictionary, Pair, asString } from "../compile";
import { Planet } from "./planet";
import { Faction } from "./faction";

export class Country {
  public name: string;

  public factions: Faction[] = [];
  public ownedPlanets: Planet[] = [];
  public controlledPlanets: Planet[] = [];

  constructor(public id: string, pairs: Pair[]) {
    var data = asDictionary(pairs);

    this.name = asString(data["name"]);
  }
}
