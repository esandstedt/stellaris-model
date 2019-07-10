import { asDictionary, Pair, asString, asPairArray } from "../compile";
import { Planet } from "./planet";
import { Faction } from "./faction";
import { Species } from "./species";

export interface Pop {
  id: string;
  amenitiesUsage: number;
  category: string;
  crime: number | undefined;
  ethos: string | undefined;
  faction: Faction | undefined;
  happiness: number | undefined;
  housingUsage: number;
  job: string | undefined;
  planet: Planet | undefined;
  power: number | undefined;
  species: Species | undefined;
}

export class PopImpl implements Pop {
  public amenitiesUsage: number;
  public category: string;
  public crime: number | undefined;
  public ethos: string | undefined;
  public factionId: string | undefined;
  public faction: Faction | undefined;
  public happiness: number | undefined;
  public housingUsage: number;
  public job: string | undefined;
  public planetId: string;
  public planet: Planet | undefined;
  public power: number | undefined;
  public speciesIndex: number;
  public species: Species | undefined;

  constructor(public id: string, pairs: Pair[]) {
    const data = asDictionary(pairs);

    this.amenitiesUsage = parseFloat(asString(data["amenities_usage"]));
    this.category = asString(data["category"]);

    if (typeof data["crime"] !== "undefined") {
      this.crime = parseFloat(asString(data["crime"]));
    }

    if (typeof data["ethos"] !== "undefined") {
      const array = asPairArray(data["ethos"]).map(x => asString(x.value));

      if (array.length !== 1) {
        throw new Error("Expected only one ethos on pop.");
      }

      this.ethos = array[0];
    }

    if (typeof data["pop_faction"] !== "undefined") {
      this.factionId = asString(data["pop_faction"]);
    }

    if (typeof data["happiness"] !== "undefined") {
      this.happiness = parseFloat(asString(data["happiness"]));
    }

    this.housingUsage = parseFloat(asString(data["housing_usage"]));

    if (typeof data["job"] !== "undefined") {
      this.job = asString(data["job"]);
    }

    this.planetId = asString(data["planet"]);

    if (typeof data["power"] !== "undefined") {
      this.power = parseFloat(asString(data["power"]));
    }

    this.speciesIndex = parseInt(asString(data["species_index"]), 10);
  }
}
