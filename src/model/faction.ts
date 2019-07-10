import { Pair, asDictionary, asString } from "../compile";
import { Country } from "./country";
import { Pop } from "./pop";
import { Leader } from "./leader";

export interface Faction {
  id: string;
  approval: number | undefined;
  country: Country | undefined;
  leader: Leader | undefined;
  name: string;
  pops: Pop[];
  support: number;
  type: string;
}

export class FactionImpl implements Faction {
  public approval: number | undefined;
  public countryId: string;
  public country: Country | undefined;
  public leaderId: string;
  public leader: Leader | undefined;
  public name: string;
  public pops: Pop[] = [];
  public support: number;
  public type: string;

  constructor(public id: string, pairs: Pair[]) {
    const data = asDictionary(pairs);

    if (typeof data["faction_approval"] !== "undefined") {
      this.approval = parseFloat(asString("faction_approval"));
    }

    this.countryId = asString(data["country"]);
    this.leaderId = asString(data["leader"]);
    this.name = asString(data["name"]);
    this.support = parseFloat(asString(data["support"]));
    this.type = asString(data["type"]);
  }
}
