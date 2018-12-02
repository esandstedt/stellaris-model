export class Player {
  name: string
  countryId: string

  constructor(doc: any) {
    this.name = doc["name"] as string;
    this.countryId = doc["country"] as string;
  }
}