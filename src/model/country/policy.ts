import { asDictionary, asString, Pair } from "../../compile";
import { Policy } from "../interfaces";

export class PolicyImpl implements Policy {
  public name: string;
  public selected: string;

  constructor(pairs: Pair[]) {
    const data = asDictionary(pairs);

    this.name = asString(data.policy);
    this.selected = asString(data.selected);
  }
}
