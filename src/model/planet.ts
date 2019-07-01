import { Coordinate } from "./coordinate";
import { Pair, asDictionary, asString, asPairArray } from "../compile";
import { Country } from "./country";

export class Planet {
  amenities: number;
  amenitiesUsage: number;
  controllerId: string | undefined;
  controller: Country | undefined;
  coordinates: Coordinate;
  crime: number;
  owner: Country | undefined;
  ownerId: string | undefined;
  name: string;
  size: number;

  constructor(public id: string, pairs: Pair[]) {
    const data = asDictionary(pairs);

    this.amenities = parseFloat(asString(data["amenities"]));
    this.amenitiesUsage = parseFloat(asString(data["amenities_usage"]));

    if (data["controller"]) {
      this.controllerId = asString(data["controller"]);
    }

    this.coordinates = new Coordinate(asPairArray(data["coordinate"]));
    this.crime = parseFloat(asString(data["crime"]));

    if (data["owner"]) {
      this.ownerId = asString(data["owner"]);
    }

    this.name = asString(data["name"]);
    this.size = parseInt(asString(data["planet_size"]));
  }
}
