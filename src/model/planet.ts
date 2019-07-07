import { Coordinate } from "./coordinate";
import { Pair, asDictionary, asString, asPairArray } from "../compile";
import { Country } from "./country";
import { System } from "./system";
import { Pop } from "./pop";

export class Planet {
  amenities: number;
  amenitiesUsage: number;
  colonizeDate: string | undefined;
  controllerId: string | undefined;
  controller: Country | undefined;
  coordinates: Coordinate;
  crime: number;
  owner: Country | undefined;
  ownerId: string | undefined;
  name: string;
  planetClass: string;
  size: number;
  stability: number;
  systemId: string;
  system: System | undefined;

  pops: Pop[] = [];

  constructor(public id: string, pairs: Pair[]) {
    const data = asDictionary(pairs);

    this.amenities = parseFloat(asString(data["amenities"]));
    this.amenitiesUsage = parseFloat(asString(data["amenities_usage"]));

    if (data["colonize_date"]) {
      this.colonizeDate = asString(data["colonize_date"]);
    }

    if (data["controller"]) {
      this.controllerId = asString(data["controller"]);
    }

    this.coordinates = new Coordinate(asPairArray(data["coordinate"]));
    this.crime = parseFloat(asString(data["crime"]));

    if (data["owner"]) {
      this.ownerId = asString(data["owner"]);
    }

    this.name = asString(data["name"]);
    this.planetClass = asString(data["planet_class"]);
    this.size = parseInt(asString(data["planet_size"]));
    this.stability = parseFloat(asString(data["stability"]));

    this.systemId = asString(
      asDictionary(asPairArray(data["coordinate"]))["origin"]
    );
  }
}
