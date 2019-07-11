import { Coordinate } from "./coordinate";
import { Pair, asDictionary, asString, asPairArray } from "../compile";
import { Country } from "./country";
import { System } from "./system";
import { Pop } from "./pop";

export interface Planet {
  id: string;
  amenities: number;
  amenitiesUsage: number;
  colonizeDate: string | undefined;
  controller: Country | undefined;
  coordinates: Coordinate;
  crime: number;
  owner: Country | undefined;
  name: string;
  planetClass: string;
  size: number;
  stability: number;
  system: System;
  pops: Pop[];
}

export class PlanetImpl {
  public amenities: number;
  public amenitiesUsage: number;
  public colonizeDate: string | undefined;
  public controllerId: string | undefined;
  public controller: Country | undefined;
  public coordinates: Coordinate;
  public crime: number;
  public ownerId: string | undefined;
  public owner: Country | undefined;
  public name: string;
  public planetClass: string;
  public size: number;
  public stability: number;

  public systemId: string;
  public _system: System | undefined;
  get system(): System {
    if (typeof this._system === "undefined") {
      throw new Error();
    }
    return this._system;
  }
  set system(value: System) {
    this._system = value;
  }

  public pops: Pop[] = [];

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
    this.size = parseInt(asString(data["planet_size"]), 10);
    this.stability = parseFloat(asString(data["stability"]));

    this.systemId = asString(
      asDictionary(asPairArray(data["coordinate"]))["origin"]
    );
  }
}
