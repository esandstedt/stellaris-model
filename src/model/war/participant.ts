import { Country, WarParticipant } from "../..";
import { Pair, asDictionary, asString } from "../../compile";
import { WarImpl } from ".";

export class WarParticipantImpl implements WarParticipant {
  public callType: string;
  public countryId: string;
  public caller: Country | undefined;
  public callerId: string | undefined;

  get country(): Country {
    if (typeof this.countryInstance === "undefined") {
      throw new Error();
    }
    return this.countryInstance;
  }
  set country(value: Country) {
    this.countryInstance = value;
  }

  private countryInstance: Country | undefined;

  constructor(public war: WarImpl, pairs: Pair[]) {
    const data = asDictionary(pairs);

    this.callType = asString(data["call_type"]);
    this.countryId = asString(data["country"]);

    const callerId = asString(data["caller"]);
    if (callerId !== "4294967295") {
      this.callerId = callerId;
    }
  }
}
