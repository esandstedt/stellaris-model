export class Country {
  public name: string;

  constructor(public id: string, doc: any) {
    this.name = doc["name"] as string;
  }
}
