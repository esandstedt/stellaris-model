import { asDictionary, Pair, asString } from "../compile";
import { Planet } from "./planet";

export class Country {
  public name: string;

  public ownedPlanets: Planet[];
  public controlledPlanets: Planet[];

  constructor(public id: string, pairs: Pair[]) {
    var data = asDictionary(pairs);

    this.name = asString(data["name"]);

    this.ownedPlanets = [];
    this.controlledPlanets = [];
  }
}
