import {
  asDictionary,
  Pair,
  asString,
  asPairArray,
  asArray
} from "../../compile";
import { War } from "../..";
import { WarParticipantImpl } from "./participant";
import { WarBattleImpl } from "./battle";

export class WarImpl implements War {
  public attackers: WarParticipantImpl[];
  public attackerWarExhaustion: number;
  public attackerWarGoals: string[];
  public battles: WarBattleImpl[];
  public defenders: WarParticipantImpl[];
  public defenderWarExhaustion: number;
  public defenderWarGoals: string[];
  public name: string;
  public startDate: string;

  constructor(public id: string, pairs: Pair[]) {
    const data = asDictionary(pairs);

    this.attackers = asArray(data["attackers"]).map(
      x => new WarParticipantImpl(asPairArray(x))
    );

    this.attackerWarExhaustion = parseFloat(
      asString(data["attacker_war_exhaustion"])
    );

    this.attackerWarGoals = asPairArray(data["attacker_war_goal"]).map(pair =>
      asString(pair.value)
    );

    if (typeof data["battles"] !== "undefined") {
      this.battles = asArray(data["battles"]).map(
        x => new WarBattleImpl(asPairArray(x))
      );
    } else {
      this.battles = [];
    }

    this.defenders = asArray(data["defenders"]).map(
      x => new WarParticipantImpl(asPairArray(x))
    );

    this.defenderWarExhaustion = parseFloat(
      asString(data["defender_war_exhaustion"])
    );

    this.defenderWarGoals = asPairArray(data["defender_war_goal"]).map(pair =>
      asString(pair.value)
    );

    this.name = asString(data["name"]);
    this.startDate = asString(data["start_date"]);
  }
}
