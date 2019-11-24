import { Government } from "../..";
import { asArray, asDictionary, asString, Pair } from "../../compile";

export class GovernmentImpl implements Government {
  public authority: string;
  public civics: string[];
  public type: string;

  constructor(pairs: Pair[]) {
    const data = asDictionary(pairs);

    this.authority = asString(data.authority);
    this.civics = asArray(data.civics).map(asString);
    this.type = asString(data.type);
  }
}
