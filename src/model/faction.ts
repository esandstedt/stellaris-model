import { Pair, asDictionary, asString } from "../compile";
import { Country } from "./country";
import { Pop } from "./pop";

export class Faction {
  public approval: number | undefined;
  public countryId: string;
  public country: Country | undefined;
  public leaderId: string;
  public name: string;
  public support: number;
  public type: string;

  public pops: Pop[] = [];

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
