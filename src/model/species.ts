import { asDictionary, asPairArray, asString, Pair } from "../compile";
import { Leader, Planet, Pop, Species } from "./interfaces";

export class SpeciesImpl implements Species {
  public adjective: string | undefined;
  public baseId: string | undefined;
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

  constructor(public id: string, pairs: Pair[]) {
    const data = asDictionary(pairs);

    if (data.adjective) {
      this.adjective = asString(data.adjective);
    }

    if (data.base) {
      this.baseId = asString(data.base);
    }

    this.name = asString(data.name);

    if (data.home_planet) {
      this.homePlanetId = asString(data.home_planet);
    }

    if (data.plural) {
      this.plural = asString(data.plural);
    }

    this.portrait = asString(data.portrait);

    this.speciesClass = asString(data.class);

    this.traits = asPairArray(data.traits).map(x => asString(x.value));

    if (data.sapient) {
      this.sapient = asString(data.sapient) !== "no";
    } else {
      this.sapient = true;
    }
  }
}
