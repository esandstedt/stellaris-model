import { Pair, asDictionary, asString } from "../compile";
import { Ship, Fleet, Leader, Army } from "./interfaces";

export class ShipImpl implements Ship {
  public experience: number;
  public army: Army | undefined;
  public fleetId: string;
  public leader: Leader | undefined;
  public name: string;

  get fleet(): Fleet {
    if (typeof this.fleetInstance === "undefined") {
      throw new Error();
    }
    return this.fleetInstance;
  }
  set fleet(value: Fleet) {
    this.fleetInstance = value;
  }

  private fleetInstance: Fleet | undefined;

  constructor(public id: string, pairs: Pair[]) {
    const data = asDictionary(pairs);

    if (typeof data["experience"] !== "undefined") {
      this.experience = parseFloat(asString(data["experience"]));
    } else {
      this.experience = 0;
    }

    this.fleetId = asString(data["fleet"]);

    if (typeof data["name"] !== "undefined") {
      this.name = asString(data["name"]);
    } else {
      this.name = "";
    }
  }
}