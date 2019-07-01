import { asDictionary, Pair } from "../compile";
import { Planet } from "./planet";

export class Country {
  public name: string;
  public ownedPlanets: Planet[];
  public controlledPlanets: Planet[];

  constructor(public id: string, pairs: Pair[]) {
    var data = asDictionary(pairs);

    this.name = data["name"] as string;
    this.ownedPlanets = [];
    this.controlledPlanets = [];
  }
}
