import { asDictionary, asString, Pair } from "../compile";
import {
  Country,
  Leader,
  Planet,
  Sector,
  SectorType,
  System
} from "./interfaces";

const SECTORTYPE_MAPPING: { [key: string]: SectorType } = {
  core_sector: SectorType.Core,
  normal_sector: SectorType.Normal
};

export class SectorImpl implements Sector {
  public capitalId: string;
  public governorId: string | undefined;
  public governor: Leader | undefined;
  public name: string;
  public ownerId: string | undefined;
  public owner: Country | undefined;
  public systems: System[] = [];
  public type: SectorType;

  get capital(): Planet {
    if (typeof this.capitalInstance === "undefined") {
      throw new Error();
    }
    return this.capitalInstance;
  }
  set capital(value: Planet) {
    this.capitalInstance = value;
  }

  private capitalInstance: Planet | undefined;

  constructor(public id: string, pairs: Pair[]) {
    const data = asDictionary(pairs);

    this.capitalId = asString(data.local_capital);

    if (typeof data.governor !== "undefined") {
      this.governorId = asString(data.governor);
    }

    this.name = asString(data.name);

    this.ownerId = asString(data.owner);

    const typeString = asString(data.type);
    this.type = SECTORTYPE_MAPPING[typeString];
    if (typeof this.type === "undefined") {
      throw new Error(`unrecognized sector type '${typeString}'`);
    }
  }
}
