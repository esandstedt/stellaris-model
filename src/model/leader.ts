import { asArray, asDictionary, asPairArray, asString, Pair } from "../compile";
import {
  Army,
  Country,
  Leader,
  LeaderType,
  Planet,
  Sector,
  Ship,
  Species
} from "./interfaces";

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
  public mandate: string[];
  public name: string | undefined;
  public planetId: string | undefined;
  public planet: Planet | undefined;
  public portrait: string;
  public researchType: string | undefined;
  public sector: Sector | undefined;
  public shipId: string | undefined;
  public ship: Ship | undefined;
  public speciesId: string;
  public traits: string[];
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

    this.age = parseInt(asString(data.age), 10);
    this.agenda = asString(data.agenda);

    if (data.country) {
      this.countryId = asString(data.country);
    }

    this.date = asString(data.date);

    if (typeof data.experience !== "undefined") {
      this.experience = parseFloat(asString(data.experience));
    } else {
      this.experience = 0;
    }

    if (typeof data.gender !== "undefined") {
      this.gender = asString(data.gender);
    }

    this.immortal = data.immortal === "yes";

    this.level = parseInt(asString(data.level), 10);

    if (typeof data.mandate !== "undefined") {
      this.mandate = asArray(data.mandate, "type").map(asString);
    } else {
      this.mandate = [];
    }

    if (typeof data.name !== "undefined") {
      this.name = asPairArray(data.name)
        .map(p => asString(p.value))
        .join(" ");
    }

    this.portrait = asString(data.portrait);

    if (typeof data.location !== "undefined") {
      const location = asDictionary(data.location);

      const locationType = asString(location.type);
      if (locationType === "army") {
        // Handled from the other side.
      } else if (locationType === "planet") {
        this.planetId = asString(location.id);
      } else if (locationType === "sector") {
        // Handled from the other side.
      } else if (locationType === "ship") {
        this.shipId = asString(location.id);
      } else if (locationType === "tech") {
        this.researchType = asString(location.area);
      } else if (locationType === "empire") {
        // TODO
      } else if (locationType === "federation") {
        // TODO
      } else if (locationType === "galactic_community") {
        // TODO
      } else if (locationType === "first_contact_system") {
        // TODO
      } else if (locationType === "spy_network") {
        // TODO
      } else {
        throw new Error(`unrecognized leader location type '${locationType}'`);
      }
    }

    if (typeof data.species_index !== "undefined") {
      this.speciesId = asString(data.species_index);
    } else if (typeof data.species !== "undefined") {
      this.speciesId = asString(data.species);
    } else {
      throw new Error("Could not find species for leader.");
    }

    const typeString = asString(data.class);

    const roles = asDictionary(data.roles);
    this.traits = asArray(roles[typeString], "trait").map(asString);

    this.type = LEADERTYPE_MAPPING[typeString];
    if (typeof this.type === "undefined") {
      throw new Error(`unrecognized leader type "${typeString}"`);
    }
  }
}

const LEADERTYPE_MAPPING: { [key: string]: LeaderType } = {
  admiral: LeaderType.Admiral,
  envoy: LeaderType.Envoy,
  general: LeaderType.General,
  governor: LeaderType.Governor,
  ruler: LeaderType.Ruler,
  scientist: LeaderType.Scientist
};
