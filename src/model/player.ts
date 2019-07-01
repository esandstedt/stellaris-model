import { Country } from "./country";
import { asDictionary, Pair, asString } from "../compile";

export class Player {
  public name: string;
  public country: Country | undefined;
  public countryId: string | undefined;

  constructor(pairs: Pair[]) {
    const data = asDictionary(pairs);

    this.name = asString(data["name"]);

    if (data["country"]) {
      this.countryId = asString(data["country"]);
    }
  }
}
