import { asDictionary, Pair, asString, asPairArray } from "../compile";
import { Country, Leader, Species, Army, LeaderType, Ship } from "./interfaces";

export class LeaderImpl implements Leader {
  public age: number;
  public agenda: string;
  public army: Army | undefined;
  public countryId: string | undefined;
  public country: Country | undefined;
  public date: string;
  public experience: number;
  public gender: string | undefined;
  public immortal: boolean;
  public level: number;
  public name: string;
  public portrait: string;
  public shipId: string | undefined;
  public ship: Ship | undefined;
  public speciesIndex: number;
  public type: LeaderType;

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

    if (data["country"]) {
      this.countryId = asString(data["country"]);
    }

    this.date = asString(data["date"]);

    if (typeof data["experience"] !== "undefined") {
      this.experience = parseFloat(asString(data["experience"]));
    } else {
      this.experience = 0;
    }

    if (typeof data["gender"] !== "undefined") {
      this.gender = asString(data["gender"]);
    }

    this.immortal = data["immortal"] === "yes";

    this.level = parseInt(asString(data["level"]), 10);

    this.name = asPairArray(data["name"])
      .map(p => asString(p.value))
      .join(" ");

    this.portrait = asString(data["portrait"]);

    if (typeof data["location"] !== "undefined") {
      const location = asDictionary(data["location"]);

      const locationType = asString(location["type"]);
      if (locationType === "ship") {
        this.shipId = asString(location["id"]);
      }
    }

    this.speciesIndex = parseInt(asString(data["species_index"]), 10);

    const typeString = asString(data["class"]);
    this.type = LEADERTYPE_MAPPING[typeString];
    if (typeof this.type === "undefined") {
      throw new Error(`unrecognized leader type "${typeString}"`);
    }
  }
}

const LEADERTYPE_MAPPING: { [key: string]: LeaderType } = {
  admiral: LeaderType.Admiral,
  general: LeaderType.General,
  governor: LeaderType.Governor,
  ruler: LeaderType.Ruler,
  scientist: LeaderType.Scientist
};
