import { asDictionary, Pair } from "../compile";

export class Country {
  public name: string;

  constructor(public id: string, pairs: Pair[]) {
    var data = asDictionary(pairs);

    this.name = data["name"] as string;
  }
}
