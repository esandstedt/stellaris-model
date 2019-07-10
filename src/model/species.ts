import { Pair, asDictionary, asString, asPairArray } from "../compile";
import { Planet } from "./planet";
import { Leader } from "./leader";
import { Pop } from "./pop";

export interface Species {
  adjective: string | undefined;
  base: Species | undefined;
  children: Species[];
  homePlanet: Planet | undefined;
  leaders: Leader[];
  name: string;
  plural: string | undefined;
  pops: Pop[];
  portrait: string;
  sapient: boolean;
  speciesClass: string;
  traits: string[];
}

export class SpeciesImpl implements Species {
  public adjective: string | undefined;
  public baseIndex: number | undefined;
  public base: Species | undefined;
  public children: Species[] = [];
  public homePlanetId: string | undefined;
  public homePlanet: Planet | undefined;
  public leaders: Leader[] = [];
  public name: string;
  public plural: string | undefined;
  public pops: Pop[] = [];
  public portrait: string;
  public sapient: boolean;
  public speciesClass: string;
  public traits: string[];

  constructor(pairs: Pair[]) {
    const data = asDictionary(pairs);

    if (data["adjective"]) {
      this.adjective = asString(data["adjective"]);
    }

    if (data["base"]) {
      this.baseIndex = parseInt(asString(data["base"]), 10);
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
