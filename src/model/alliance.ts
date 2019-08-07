import { Pair, asDictionary, asString } from "../compile";
import { Country, Alliance } from "./interfaces";

export const keys = new Set<string>();

export class AllianceImpl implements Alliance {
  public date: string;
  public leaderId: string;
  public members: Country[] = [];
  public name: string;

  get leader(): Country {
    if (typeof this.leaderInstance === "undefined") {
      throw new Error();
    }
    return this.leaderInstance;
  }
  set leader(value: Country) {
    this.leaderInstance = value;
  }

  private leaderInstance: Country | undefined;

  constructor(public id: string, pairs: Pair[]) {
    const data = asDictionary(pairs);

    this.date = asString(data["start_date"]);

    this.leaderId = asString(data["leader"]);

    this.name = asString(data["name"]);

    pairs.forEach(({ key }) => {
      if (key) keys.add(key);
    });
  }
}
