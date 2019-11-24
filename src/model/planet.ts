import { asArray, asDictionary, asPairArray, asString, Pair } from "../compile";
import { CoordinateImpl } from "./coordinate";
import { Army, Country, Planet, Pop, System } from "./interfaces";

export class PlanetImpl implements Planet {
  public amenities: number;
  public amenitiesUsage: number;
  public armies: Army[] = [];
  public buildings: string[];
  public colonizeDate: string | undefined;
  public controllerId: string | undefined;
  public controller: Country | undefined;
  public coordinates: CoordinateImpl;
  public crime: number;
  public districts: string[];
  public migration: number;
  public name: string;
  public ownerId: string | undefined;
  public owner: Country | undefined;
  public planetClass: string;
  public pops: Pop[] = [];
  public size: number;
  public stability: number;
  public systemId: string;
  public totalHousing: number;

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

    this.amenities = parseFloat(asString(data.amenities));
    this.amenitiesUsage = parseFloat(asString(data.amenities_usage));

    if (typeof data.building === "undefined") {
      this.buildings = [];
    } else if (typeof data.building === "string") {
      this.buildings = [asString(data.building)];
    } else {
      this.buildings = asArray(data.building).map(asString);
    }

    if (data.colonize_date) {
      this.colonizeDate = asString(data.colonize_date);
    }

    if (data.controller) {
      this.controllerId = asString(data.controller);
    }

    this.coordinates = new CoordinateImpl(asPairArray(data.coordinate));
    this.crime = parseFloat(asString(data.crime));

    if (typeof data.district === "undefined") {
      this.districts = [];
    } else if (typeof data.district === "string") {
      this.districts = [asString(data.district)];
    } else {
      this.districts = asArray(data.district).map(asString);
    }

    this.migration = parseFloat(asString(data.migration));
    this.name = asString(data.name);

    if (data.owner) {
      this.ownerId = asString(data.owner);
    }

    this.planetClass = asString(data.planet_class);
    this.size = parseInt(asString(data.planet_size), 10);
    this.stability = parseFloat(asString(data.stability));
    this.systemId = asString(asDictionary(data.coordinate).origin);
    this.totalHousing = parseFloat(asString(data.total_housing));
  }
}
