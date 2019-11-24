import { asDictionary, asString, Pair } from "../compile";
import { Country, Faction, Leader, Pop } from "./interfaces";

export class FactionImpl implements Faction {
  public approval: number | undefined;
  public countryId: string;
  public leaderId: string | undefined;
  public leader: Leader | undefined;
  public name: string;
  public pops: Pop[] = [];
  public support: number;
  public type: string;

  get country(): Country {
    if (typeof this.countryInstance === "undefined") {
      throw new Error();
    }
    return this.countryInstance;
  }
  set country(value: Country) {
    this.countryInstance = value;
  }

  private countryInstance: Country | undefined;

  constructor(public id: string, pairs: Pair[]) {
    const data = asDictionary(pairs);

    if (typeof data.faction_approval !== "undefined") {
      this.approval = parseFloat(asString("faction_approval"));
    }

    this.countryId = asString(data.country);

    if (typeof data.leader !== "undefined") {
      this.leaderId = asString(data.leader);
    }

    this.name = asString(data.name);

    if (typeof data.support !== "undefined") {
      this.support = parseFloat(asString(data.support));
    } else {
      this.support = 0;
    }

    this.type = asString(data.type);
  }
}
