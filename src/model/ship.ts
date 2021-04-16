import { asDictionary, asString, Pair } from "../compile";
import { Army, Fleet, Leader, Ship, ShipDesign, System } from "./interfaces";

export class ShipImpl implements Ship {
  public designId: string;
  public experience: number;
  public army: Army | undefined;
  public fleetId: string;
  public leader: Leader | undefined;
  public systemId: string;
  public system: System | undefined;
  public name: string;

  get design(): ShipDesign {
    if (typeof this.designInstance === "undefined") {
      throw new Error();
    }
    return this.designInstance;
  }
  set design(value: ShipDesign) {
    this.designInstance = value;
  }

  get fleet(): Fleet {
    if (typeof this.fleetInstance === "undefined") {
      throw new Error();
    }
    return this.fleetInstance;
  }
  set fleet(value: Fleet) {
    this.fleetInstance = value;
  }

  private designInstance: ShipDesign | undefined;
  private fleetInstance: Fleet | undefined;

  constructor(public id: string, pairs: Pair[]) {
    const data = asDictionary(pairs);

    this.designId = asString(data.ship_design);

    if (typeof data.experience !== "undefined") {
      this.experience = parseFloat(asString(data.experience));
    } else {
      this.experience = 0;
    }

    this.fleetId = asString(data.fleet);

    if (typeof data.name !== "undefined") {
      this.name = asString(data.name);
    } else {
      this.name = "";
    }

    this.systemId = asString(asDictionary(data.coordinate).origin);
  }
}
