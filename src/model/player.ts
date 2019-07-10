import { Country } from "./country";
import { asDictionary, Pair, asString } from "../compile";

export interface Player {
  country: Country | undefined;
  name: string;
}

export class PlayerImpl implements Player {
  public countryId: string | undefined;
  public country: Country | undefined;
  public name: string;

  constructor(pairs: Pair[]) {
    const data = asDictionary(pairs);

    if (data["country"]) {
      this.countryId = asString(data["country"]);
    }

    this.name = asString(data["name"]);
  }
}
