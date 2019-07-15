import { Pair, asDictionary, asString, asPairArray } from "../compile";
import { System } from "..";

export interface Wormhole {
  id: string;
  link: Wormhole;
  system: System;
}

export class WormholeImpl implements Wormhole {
  public id: string;
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

    this.id = asString(data["bypass"]);

    const bypass = asDictionary(asPairArray(bypasses[this.id]));
    const coordinate = asDictionary(asPairArray(data["coordinate"]));

    this.linkId = asString(bypass["linked_to"]);
    this.systemId = asString(coordinate["origin"]);
  }
}
