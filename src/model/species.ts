import { Pair, asDictionary, asString, asPairArray } from "../compile";
import { Planet } from "./planet";
import { Leader } from "./leader";
import { Pop } from "./pop";

export class Species {
  public adjective: string | undefined;
  public baseIndex: number | undefined;
  public base: Species | undefined;
  public name: string;
  public homePlanetId: string | undefined;
  public homePlanet: Planet | undefined;
  public plural: string | undefined;
  public portrait: string;
  public sapient: boolean;
  public speciesClass: string;
  public traits: string[];

  public leaders: Leader[] = [];
  public pops: Pop[] = [];

  constructor(pairs: Pair[]) {
    const data = asDictionary(pairs);

    if (data["adjective"]) {
      this.adjective = asString(data["adjective"]);
    }

    if (data["base"]) {
      this.baseIndex = parseInt(asString(data["base"]));
    }

    this.name = asString(data["name"]);

    if (data["home_planet"]) {
      this.homePlanetId = asString(data["home_planet"]);
    }

    if (data["plural"]) {
      this.plural = asString(data["plural"]);
    }

    this.portrait = asString(data["portrait"]);

    this.speciesClass = asString(data["class"]);

    this.traits = asPairArray(data["traits"]).map(x => asString(x.value));

    if (data["sapient"]) {
      this.sapient = asString(data["sapient"]) !== "no";
    } else {
      this.sapient = true;
    }
  }
}
