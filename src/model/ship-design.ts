import { asDictionary, asString, Pair } from "../compile";
import { Ship, ShipDesign } from "./interfaces";

export class ShipDesignImpl implements ShipDesign {
  public name: string | undefined;
  public ships: Ship[] = [];
  public type: string;

  constructor(public id: string, pairs: Pair[]) {
    const data = asDictionary(pairs);

    if (typeof data.name !== "undefined") {
      this.name = asString(data.name);
    }

    this.type = asString(data.ship_size);
  }
}
