import { asDictionary, Pair, asString, asPairArray } from "../compile";
import { Fleet, Country, System, Ship } from "./interfaces";

export class FleetImpl implements Fleet {
  public isCivilian: boolean;
  public isStation: boolean;
  public militaryPower: number;
  public name: string;
  public ownerId: string;
  public ships: Ship[] = [];
  public systemId: string;

  get owner(): Country {
    if (typeof this.ownerInstance === "undefined") {
      throw new Error();
    }
    return this.ownerInstance;
  }
  set owner(value: Country) {
    this.ownerInstance = value;
  }

  get system(): System {
    if (typeof this.systemInstance === "undefined") {
      throw new Error();
    }
    return this.systemInstance;
  }
  set system(value: System) {
    this.systemInstance = value;
  }

  private ownerInstance: Country | undefined;
  private systemInstance: System | undefined;

  constructor(public id: string, pairs: Pair[]) {
    const data = asDictionary(pairs);

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

    // const combat = asDictionary(asPairArray(data["combat"]));
    const movementManager = asDictionary(asPairArray(data["movement_manager"]));

    this.systemId = asString(
      asDictionary(asPairArray(movementManager["coordinate"]))["origin"]
    );
  }
}
