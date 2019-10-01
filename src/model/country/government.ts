import { Pair, asDictionary, asString, asArray } from "../../compile";
import { Government } from "../..";

export class GovernmentImpl implements Government {
  public authority: string;
  public civics: string[];
  public type: string;

  constructor(pairs: Pair[]) {
    const data = asDictionary(pairs);

    this.authority = asString(data["authority"]);
    this.civics = asArray(data["civics"]).map(asString);
    this.type = asString(data["type"]);
  }
}
