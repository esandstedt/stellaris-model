import { asDictionary, asPairArray, asString, Pair } from "../compile";
import { Country, Ship, Starbase, System } from "./interfaces";

export class StarbaseImpl implements Starbase {
  public buildings: string[];
  public level: string;
  public modules: string[];
  public ownerId: string;
  public stationId: string;
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

  get station(): Ship {
    if (typeof this.stationInstance === "undefined") {
      throw new Error();
    }
    return this.stationInstance;
  }
  set station(value: Ship) {
    this.stationInstance = value;
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
  private stationInstance: Ship | undefined;
  private systemInstance: System | undefined;

  constructor(public id: string, pairs: Pair[]) {
    const data = asDictionary(pairs);

    if (typeof data.buildings !== "undefined") {
      this.buildings = asPairArray(data.buildings).map(x => asString(x.value));
    } else {
      this.buildings = [];
    }

    this.level = asString(data.level);

    if (typeof data.modules !== "undefined") {
      this.modules = asPairArray(data.modules).map(x => asString(x.value));
    } else {
      this.modules = [];
    }

    this.ownerId = asString(data.owner);
    this.stationId = asString(data.station);
    this.systemId = asString(data.system);
  }
}
