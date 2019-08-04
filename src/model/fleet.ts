import { asDictionary, Pair, asString } from "../compile";
import { Fleet, Country, Ship } from "./interfaces";

export class FleetImpl implements Fleet {
  public isCivilian: boolean;
  public isStation: boolean;
  public militaryPower: number;
  public name: string;
  public ownerId: string;
  public ships: Ship[] = [];

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
    var data = asDictionary(pairs);

    if (typeof data["civilian"] !== "undefined") {
      this.isCivilian = asString(data["civilian"]) === "yes";
    } else {
      this.isCivilian = false;
    }

    if (typeof data["station"] !== "undefined") {
      this.isStation = asString(data["station"]) === "yes";
    } else {
      this.isStation = false;
    }

    this.militaryPower = parseFloat(asString(data["military_power"]));
    this.name = asString(data["name"]);
    this.ownerId = asString(data["owner"]);
  }
}
