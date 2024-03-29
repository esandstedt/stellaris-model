import { asDictionary, asPairArray, asString, Pair } from "../compile";
import { Faction, Planet, Pop, Species } from "./interfaces";

export class PopImpl implements Pop {
  public amenitiesUsage: number;
  public canMigrate: boolean;
  public category: string;
  public crime: number | undefined;
  public ethos: string | undefined;
  public factionId: string | undefined;
  public faction: Faction | undefined;
  public happiness: number | undefined;
  public housingUsage: number;
  public job: string | undefined;
  public planetId: string;
  public power: number | undefined;
  public promotionDate: string | undefined;
  public speciesId: string;

  get planet(): Planet {
    if (typeof this.planetInstance === "undefined") {
      throw new Error();
    }
    return this.planetInstance;
  }
  set planet(value: Planet) {
    this.planetInstance = value;
  }

  get species(): Species {
    if (typeof this.speciesInstance === "undefined") {
      throw new Error();
    }
    return this.speciesInstance;
  }
  set species(value: Species) {
    this.speciesInstance = value;
  }

  private planetInstance: Planet | undefined;
  private speciesInstance: Species | undefined;

  constructor(public id: string, pairs: Pair[]) {
    const data = asDictionary(pairs);

    this.amenitiesUsage = parseFloat(asString(data.amenities_usage));
    this.canMigrate = data.can_migrate !== "no";
    this.category = asString(data.category);

    if (typeof data.crime !== "undefined") {
      this.crime = parseFloat(asString(data.crime));
    }

    if (typeof data.ethos !== "undefined") {
      const array = asPairArray(data.ethos).map(x => asString(x.value));

      if (array.length !== 1) {
        throw new Error("Expected only one ethos on pop.");
      }

      this.ethos = array[0];
    }

    if (typeof data.pop_faction !== "undefined") {
      this.factionId = asString(data.pop_faction);
    }

    if (typeof data.happiness !== "undefined") {
      this.happiness = parseFloat(asString(data.happiness));
    }

    this.housingUsage = parseFloat(asString(data.housing_usage));

    if (typeof data.job !== "undefined") {
      this.job = asString(data.job);
    }

    this.planetId = asString(data.planet);

    if (typeof data.power !== "undefined") {
      this.power = parseFloat(asString(data.power));
    }

    if (typeof data.promotion_date !== "undefined") {
      this.promotionDate = asString(data.promotion_date);
    }

    if (typeof data.species_index !== "undefined") {
      this.speciesId = asString(data.species_index);
    } else if (typeof data.species !== "undefined") {
      this.speciesId = asString(data.species);
    } else {
      throw new Error("Could not find species for pop.");
    }
  }
}
