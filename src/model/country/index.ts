import { asDictionary, Pair, asString, asPairArray } from "../../compile";
import { FlagImpl } from "./flag";
import {
  Country,
  Faction,
  Leader,
  Planet,
  Starbase,
  Fleet,
  Army,
  Sector,
  Alliance,
  Ethic
} from "../interfaces";

export class CountryImpl implements Country {
  public adjective: string;
  public allianceId: string | undefined;
  public alliance: Alliance | undefined;
  public armies: Army[] = [];
  public capitalId: string | undefined;
  public capital: Planet | undefined;
  public controlledPlanets: Planet[] = [];
  public economyPower: number;
  public empireSize: number;
  public ethos: Ethic[];
  public factions: Faction[] = [];
  public flag: FlagImpl;
  public fleets: Fleet[] = [];
  public fleetSize: number;
  public heir: Leader | undefined;
  public leaders: Leader[] = [];
  public militaryPower: number;
  public name: string;
  public overlordId: string | undefined;
  public overlord: Country | undefined;
  public ownedPlanets: Planet[] = [];
  public rulerId: string | undefined;
  public ruler: Leader | undefined;
  public sectors: Sector[] = [];
  public starbases: Starbase[] = [];
  public subjects: Country[] = [];

  constructor(public id: string, pairs: Pair[]) {
    const data = asDictionary(pairs);

    this.adjective = asString(data["adjective"]);

    if (typeof data["alliance"] !== "undefined") {
      this.allianceId = asString(data["alliance"]);
    }

    if (typeof data["capital"] !== "undefined") {
      this.capitalId = asString(data["capital"]);
    }

    this.economyPower = parseFloat(asString(data["economy_power"]));

    if (data["overlord"]) {
      this.overlordId = asString(data["overlord"]);
    }

    this.flag = new FlagImpl(asPairArray(data["flag"]));
    this.fleetSize = parseInt(asString(data["fleet_size"]), 10);
    this.name = asString(data["name"]);

    if (typeof data["ethos"] !== "undefined") {
      this.ethos = asPairArray(data["ethos"])
        .map(({ value }) => asString(value))
        .map(ethicString => {
          const ethic = ETHIC_MAPPING[ethicString];
          if (typeof ethic === "undefined") {
            throw new Error(`unrecognized ethic '${ethicString}'`);
          }
          return ethic;
        });
    } else {
      this.ethos = [];
    }

    if (typeof data["empire_size"] !== "undefined") {
      this.empireSize = parseInt(asString(data["empire_size"]));
    } else {
      this.empireSize = 0;
    }

    if (typeof data["military_power"] !== "undefined") {
      this.militaryPower = parseFloat(asString(data["military_power"]));
    } else {
      this.militaryPower = 0;
    }

    if (typeof data["ruler"] !== "undefined") {
      this.rulerId = asString(data["ruler"]);
    }
  }
}

const ETHIC_MAPPING: { [key: string]: Ethic } = {
  ethic_gestalt_consciousness: Ethic.GestaltConsciousness,
  ethic_authoritarian: Ethic.Authoritarian,
  ethic_fanatic_authoritarian: Ethic.FanaticAuthoritarian,
  ethic_egalitarian: Ethic.Egalitarian,
  ethic_fanatic_egalitarian: Ethic.FanaticEgalitarian,
  ethic_materialist: Ethic.Materialist,
  ethic_fanatic_materialist: Ethic.FanaticMaterialist,
  ethic_militarist: Ethic.Militarist,
  ethic_fanatic_militarist: Ethic.FanaticMilitarist,
  ethic_pacifist: Ethic.Pacifist,
  ethic_fanatic_pacifist: Ethic.FanaticPacifist,
  ethic_spiritualist: Ethic.Spiritualist,
  ethic_fanatic_spiritualist: Ethic.FanaticSpiritualist,
  ethic_xenophile: Ethic.Xenophile,
  ethic_fanatic_xenophile: Ethic.FanaticXenophile,
  ethic_xenophobe: Ethic.Xenophobe,
  ethic_fanatic_xenophobe: Ethic.FanaticXenophobe
};
