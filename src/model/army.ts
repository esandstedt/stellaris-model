import { asDictionary, asString, Pair } from "../compile";
import {
  Army,
  Country,
  Leader,
  Planet,
  Pop,
  Ship,
  Species
} from "./interfaces";

export class ArmyImpl implements Army {
  public experience: number;
  public health: number;
  public homeId: string | undefined;
  public home: Planet | undefined;
  public leaderId: string | undefined;
  public leader: Leader | undefined;
  public maxHealth: number;
  public morale: number | undefined;
  public ownerId: string;
  public name: string;
  public planetId: string | undefined;
  public planet: Planet | undefined;
  public popId: string | undefined;
  public pop: Pop | undefined;
  public shipId: string | undefined;
  public ship: Ship | undefined;
  public speciesIndex: number | undefined;
  public species: Species | undefined;
  public type: string;

  get owner(): Country {
    if (typeof this.ownerInstance === "undefined") {
      throw new Error();
    }
    return this.ownerInstance;
  }
  set owner(value: Country) {
    this.ownerInstance = value;
  }

  private ownerInstance: Country | undefined;

  constructor(public id: string, pairs: Pair[]) {
    const data = asDictionary(pairs);

    if (typeof data.experience !== "undefined") {
      this.experience = parseFloat(asString(data.experience));
    } else {
      this.experience = 0;
    }

    this.health = parseFloat(asString(data.health));

    if (typeof data.home_planet !== "undefined") {
      this.homeId = asString(data.home_planet);
    }

    if (typeof data.leader !== "undefined") {
      this.leaderId = asString(data.leader);
    }

    this.maxHealth = parseFloat(asString(data.max_health));

    if (typeof data.morale !== "undefined") {
      this.morale = parseFloat(asString(data.morale));
    }

    this.name = asString(data.name);
    this.ownerId = asString(data.owner);

    if (typeof data.ship !== "undefined") {
      this.shipId = asString(data.ship);
    }

    if (typeof data.species_index !== "undefined") {
      this.speciesIndex = parseInt(asString(data.species_index), 10);
    }

    if (typeof data.planet !== "undefined") {
      this.planetId = asString(data.planet);
    }

    if (typeof data.pop !== "undefined") {
      this.popId = asString(data.pop);
    }

    this.type = asString(data.type);
  }
}
