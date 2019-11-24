import { asDictionary, asString, Pair } from "../compile";
import { Country, Megastructure, System } from "./interfaces";

export class MegastructureImpl implements Megastructure {
  public owner: Country | undefined;
  public ownerId: string | undefined;
  public systemId: string;
  public type: string;

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

    if (typeof data.owner !== "undefined") {
      this.ownerId = asString(data.owner);
    }

    this.systemId = asString(asDictionary(data.coordinate).origin);

    this.type = asString(data.type);
  }
}
