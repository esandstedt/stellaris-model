import { asDictionary, asString, Pair } from "../../compile";
import { Edict } from "../interfaces";

export class EdictImpl implements Edict {
  public name: string;
  public date: string;

  constructor(pairs: Pair[]) {
    const data = asDictionary(pairs);

    this.name = asString(data.edict);
    this.date = asString(data.date);
  }
}
