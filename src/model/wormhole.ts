import { asDictionary, asPairArray, asString, Pair } from "../compile";
import { CoordinateImpl } from "./coordinate";
import { System, Wormhole } from "./interfaces";

export class WormholeImpl implements Wormhole {
  public id: string;
  public coordinate: CoordinateImpl;
  public linkId: string;
  public systemId: string;

  get link(): Wormhole {
    if (typeof this.linkInstance === "undefined") {
      throw new Error();
    }
    return this.linkInstance;
  }
  set link(value: Wormhole) {
    this.linkInstance = value;
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

  private linkInstance: Wormhole | undefined;
  private systemInstance: System | undefined;

  constructor(pairs: Pair[], bypasses: { [key: string]: Pair[] | string }) {
    const data = asDictionary(pairs);

    this.id = asString(data.bypass);

    const bypass = asDictionary(bypasses[this.id]);

    const coordinatePairs = asPairArray(data.coordinate);
    this.coordinate = new CoordinateImpl(coordinatePairs);

    this.linkId = asString(bypass.linked_to);
    this.systemId = asString(asDictionary(coordinatePairs).origin);
  }
}
