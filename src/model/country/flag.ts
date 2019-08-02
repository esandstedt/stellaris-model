import { asDictionary, Pair, asPairArray, asString } from "../../compile";
import { Flag } from "../interfaces";

export class FlagImpl implements Flag {
  public background: {
    category: string;
    file: string;
  };

  public colors: string[];

  public icon: {
    category: string;
    file: string;
  };

  constructor(pairs: Pair[]) {
    const data = asDictionary(pairs);

    const background = asDictionary(asPairArray(data["background"]));
    this.background = {
      category: asString(background["category"]),
      file: asString(background["file"])
    };

    this.colors = asPairArray(data["colors"])
      .map(x => asString(x.value))
      .filter(x => x !== "null");

    const icon = asDictionary(asPairArray(data["icon"]));
    this.icon = {
      category: asString(icon["category"]),
      file: asString(icon["file"])
    };
  }
}
