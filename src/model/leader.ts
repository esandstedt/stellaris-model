import { asDictionary, Pair, asString, asPairArray } from "../compile";
import { Country, Leader, Species } from "./interfaces";

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
  public shipId: string | undefined;
  public speciesIndex: number;

  get species(): Species {
    if (typeof this.speciesInstance === "undefined") {
      throw new Error();
    }
    return this.speciesInstance;
  }
  set species(value: Species) {
    this.speciesInstance = value;
  }

  private speciesInstance: Species | undefined;

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

    if (typeof data["location"] !== "undefined") {
      const location = asDictionary(asPairArray(data["location"]));

      const locationType = asString(location["type"]);
      if (locationType === "ship") {
        this.shipId = asString(location["id"]);
      }
    }

    this.speciesIndex = parseInt(asString(data["species_index"]), 10);
  }
}
