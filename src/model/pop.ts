import { asDictionary, Pair, asString, asPairArray } from "../compile";
import { Planet } from "./planet";
import { Faction } from "./faction";

export class Pop {
  amenitiesUsage: number;
  category: string;
  crime: number | undefined;
  ethos: string | undefined;
  factionId: string | undefined;
  faction: Faction | undefined;
  happiness: number;
  housingUsage: number;
  job: string | undefined;
  planetId: string;
  planet: Planet | undefined;
  power: number | undefined;
  speciesIndex: number;

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

    if (data["pop_faction"]) {
      this.factionId = asString(data["pop_faction"]);
    }

    this.happiness = parseFloat(asString(data["happiness"]));
    this.housingUsage = parseFloat(asString(data["housing_usage"]));

    if (typeof data["job"] !== "undefined") {
      this.job = asString(data["job"]);
    }

    this.planetId = asString(data["planet"]);

    if (typeof data["power"] !== "undefined") {
      this.power = parseFloat(asString(data["power"]));
    }

    this.speciesIndex = parseInt(asString(data["species_index"]));
  }
}
