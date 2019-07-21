import { Pair, asDictionary, asString } from "../compile";
import { Country } from "./country";
import { Pop } from "./pop";
import { Leader } from "./leader";

export interface Faction {
  id: string;
  approval: number | undefined;
  country: Country;
  leader: Leader | undefined;
  name: string;
  pops: Pop[];
  support: number;
  type: string;
}

export class FactionImpl implements Faction {
  public approval: number | undefined;
  public countryId: string;
  public leaderId: string | undefined;
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

  get leader(): Leader {
    if (typeof this.leaderInstance === "undefined") {
      throw new Error();
    }
    return this.leaderInstance;
  }
  set leader(value: Leader) {
    this.leaderInstance = value;
  }

  private countryInstance: Country | undefined;
  private leaderInstance: Leader | undefined;

  constructor(public id: string, pairs: Pair[]) {
    const data = asDictionary(pairs);

    if (typeof data["faction_approval"] !== "undefined") {
      this.approval = parseFloat(asString("faction_approval"));
    }

    this.countryId = asString(data["country"]);

    if (typeof data["leader"] !== "undefined") {
      this.leaderId = asString(data["leader"]);
    }

    this.name = asString(data["name"]);
    this.support = parseFloat(asString(data["support"]));
    this.type = asString(data["type"]);
  }
}
