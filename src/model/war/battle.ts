import { Country, Planet, System, WarBattle } from "../..";
import { asArray, asDictionary, asString, Pair } from "../../compile";

export class WarBattleImpl implements WarBattle {
  public attackers: Country[] = [];
  public attackerIds: string[];
  public attackerLosses: number;
  public attackerWarExhaustion: number;
  public date: string;
  public defenders: Country[] = [];
  public defenderIds: string[];
  public defenderLosses: number;
  public defenderWarExhaustion: number;
  public planet: Planet | undefined;
  public planetId: string | undefined;
  public system: System | undefined;
  public systemId: string | undefined;
  public type: "ships" | "armies";
  public victor: "attacker" | "defender";

  constructor(pairs: Pair[]) {
    const data = asDictionary(pairs);

    this.attackerIds = asArray(data.attackers).map(x => asString(x));
    this.attackerLosses = parseInt(asString(data.attacker_losses), 10);
    this.attackerWarExhaustion = parseFloat(
      asString(data.attacker_war_exhaustion)
    );
    this.date = asString(data.date);
    this.defenderIds = asArray(data.defenders).map(x => asString(x));
    this.defenderLosses = parseInt(asString(data.defender_losses), 10);
    this.defenderWarExhaustion = parseFloat(
      asString(data.defender_war_exhaustion)
    );

    const planetId = asString(data.planet);
    if (planetId !== "4294967295") {
      this.planetId = planetId;
    }

    const systemId = asString(data.system);
    if (systemId !== "4294967295") {
      this.systemId = systemId;
    }

    const type = asString(data.type);
    if (type === "armies") {
      this.type = "armies";
    } else if (type === "ships") {
      this.type = "ships";
    } else {
      throw new Error(`Unrecognized battle type '${type}'.`);
    }

    const attackerVictory = asString(data.attacker_victory);
    if (attackerVictory === "yes") {
      this.victor = "attacker";
    } else if (attackerVictory === "no") {
      this.victor = "defender";
    } else {
      throw new Error(
        `Unrecognized attacker victory value '${attackerVictory}'.`
      );
    }
  }
}
