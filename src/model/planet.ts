import { CoordinateImpl } from "./coordinate";
import { Pair, asDictionary, asString, asPairArray } from "../compile";
import { Country, Pop, System, Planet } from "./interfaces";

export class PlanetImpl implements Planet {
  public amenities: number;
  public amenitiesUsage: number;
  public colonizeDate: string | undefined;
  public controllerId: string | undefined;
  public controller: Country | undefined;
  public coordinates: CoordinateImpl;
  public crime: number;
  public ownerId: string | undefined;
  public owner: Country | undefined;
  public name: string;
  public planetClass: string;
  public size: number;
  public stability: number;
  public systemId: string;
  public pops: Pop[] = [];

  get system(): System {
    if (typeof this.systemInstance === "undefined") {
      throw new Error();
    }
    return this.systemInstance;
  }
  set system(value: System) {
    this.systemInstance = value;
  }

  private systemInstance: System | undefined;

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

    this.coordinates = new CoordinateImpl(asPairArray(data["coordinate"]));
    this.crime = parseFloat(asString(data["crime"]));

    if (data["owner"]) {
      this.ownerId = asString(data["owner"]);
    }

    this.name = asString(data["name"]);
    this.planetClass = asString(data["planet_class"]);
    this.size = parseInt(asString(data["planet_size"]), 10);
    this.stability = parseFloat(asString(data["stability"]));

    this.systemId = asString(asDictionary(data["coordinate"])["origin"]);
  }
}
