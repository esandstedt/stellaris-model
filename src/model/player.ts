import { Country } from "./country";
import { asDictionary, Pair } from "../compile";

export class Player {
  public name: string;
  public country: Country | undefined;
  public countryId: string;

  constructor(pairs: Pair[]) {
    const data = asDictionary(pairs);

    this.name = data["name"] as string;
    this.countryId = data["country"] as string;
  }
}
