import { Country } from "./country";

export class Player {
  public name: string;
  public country: Country | undefined;
  public countryId: string;

  constructor(doc: any) {
    this.name = doc["name"] as string;
    this.countryId = doc["country"] as string;
  }
}
