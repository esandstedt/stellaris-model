import { asDictionary, Pair, asString, asPairArray } from "../compile";
import { Country } from "./country";
import { Species } from "./species";

export interface Leader {
  id: string;
  age: number;
  agenda: string;
  leaderClass: string;
  country: Country | undefined;
  gender: string | undefined;
  level: number;
  name: string;
  species: Species;
}

export class LeaderImpl implements Leader {
  public age: number;
  public agenda: string;
  public leaderClass: string;
  public countryId: string | undefined;
  public country: Country | undefined;
  public creatorId: string;
  public gender: string | undefined;
  public level: number;
  public name: string;

  public speciesIndex: number;
  private _species: Species | undefined;
  get species(): Species {
    if (typeof this._species === "undefined") {
      throw new Error();
    }
    return this._species;
  }
  set species(value: Species) {
    this._species = value;
  }

  constructor(public id: string, pairs: Pair[]) {
    const data = asDictionary(pairs);

    this.age = parseInt(asString(data["age"]), 10);
    this.agenda = asString(data["agenda"]);
    this.leaderClass = asString(data["class"]);

    if (data["country"]) {
      this.countryId = asString(data["country"]);
    }

    this.creatorId = asString(data["creator"]);

    if (typeof data["gender"] !== "undefined") {
      this.gender = asString(data["gender"]);
    }

    this.level = parseInt(asString(data["level"]), 10);

    this.name = asPairArray(data["name"])
      .map(p => asString(p.value))
      .join(" ");

    this.speciesIndex = parseInt(asString(data["species_index"]), 10);
  }
}