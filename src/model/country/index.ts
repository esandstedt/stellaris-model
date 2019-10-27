import {
  asDictionary,
  Pair,
  asString,
  asPairArray,
  asArray
} from "../../compile";
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
  Ethic,
  War,
  Policy,
  Edict,
  Budget,
  Government,
  Megastructure
} from "../interfaces";
import { PolicyImpl } from "./policy";
import { EdictImpl } from "./edict";
import { BudgetImpl } from "./budget";
import { GovernmentImpl } from "./government";

export class CountryImpl implements Country {
  public activePolicies: Policy[];
  public adjective: string;
  public allianceId: string | undefined;
  public alliance: Alliance | undefined;
  public armies: Army[] = [];
  public ascensionPerks: string[];
  public associatedAllianceId: string | undefined;
  public associatedAlliance: Alliance | undefined;
  public budget: Budget;
  public capitalId: string | undefined;
  public capital: Planet | undefined;
  public cityGraphicalCulture: string | undefined;
  public controlledPlanets: Planet[] = [];
  public customName: boolean;
  public economyPower: number;
  public edicts: Edict[];
  public emigration: number;
  public empireCohesion: number;
  public empireSize: number;
  public ethos: Ethic[];
  public factions: Faction[] = [];
  public flag: FlagImpl;
  public fleets: Fleet[] = [];
  public fleetSize: number;
  public government: Government | undefined;
  public heir: Leader | undefined;
  public immigration: number;
  public leaders: Leader[] = [];
  public megastructures: Megastructure[] = [];
  public militaryPower: number;
  public name: string;
  public overlordId: string | undefined;
  public overlord: Country | undefined;
  public ownedPlanets: Planet[] = [];
  public rulerId: string | undefined;
  public ruler: Leader | undefined;
  public sectors: Sector[] = [];
  public starbases: Starbase[] = [];
  public starbaseCapacity: number;
  public subjects: Country[] = [];
  public subjectDate: string | undefined;
  public subjectType: string | undefined;
  public traditions: string[];
  public type: string;
  public victoryRank: number;
  public victoryScore: number;
  public wars: War[] = [];

  constructor(public id: string, pairs: Pair[]) {
    const data = asDictionary(pairs);

    if (typeof data["active_policies"] !== "undefined") {
      this.activePolicies = asArray(data["active_policies"]).map(
        x => new PolicyImpl(asPairArray(x))
      );
    } else {
      this.activePolicies = [];
    }

    this.adjective = asString(data["adjective"]);

    if (typeof data["alliance"] !== "undefined") {
      this.allianceId = asString(data["alliance"]);
    }

    if (typeof data["ascension_perks"] !== "undefined") {
      this.ascensionPerks = asArray(data["ascension_perks"]).map(asString);
    } else {
      this.ascensionPerks = [];
    }

    if (typeof data["associated_alliance"] !== "undefined") {
      this.associatedAllianceId = asString(data["associated_alliance"]);
    }

    this.budget = new BudgetImpl(asPairArray(data["budget"]));

    if (typeof data["capital"] !== "undefined") {
      this.capitalId = asString(data["capital"]);
    }
    if (typeof data["city_graphical_culture"] !== "undefined") {
      this.cityGraphicalCulture = asString(data["city_graphical_culture"]);
    }

    this.customName = data["custom_name"] === "yes";

    this.economyPower = parseFloat(asString(data["economy_power"]));

    if (typeof data["edicts"] !== "undefined") {
      this.edicts = asArray(data["edicts"]).map(
        x => new EdictImpl(asPairArray(x))
      );
    } else {
      this.edicts = [];
    }

    this.emigration = parseFloat(asString(data["emigration"]));

    this.empireCohesion = parseFloat(asString(data["empire_cohesion"]));

    if (typeof data["empire_size"] !== "undefined") {
      this.empireSize = parseInt(asString(data["empire_size"]), 10);
    } else {
      this.empireSize = 0;
    }

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

    this.flag = new FlagImpl(asPairArray(data["flag"]));
    this.fleetSize = parseInt(asString(data["fleet_size"]), 10);

    if (typeof data["government"] !== "undefined") {
      this.government = new GovernmentImpl(asPairArray(data["government"]));
    }

    this.immigration = parseFloat(asString(data["immigration"]));

    if (typeof data["military_power"] !== "undefined") {
      this.militaryPower = parseFloat(asString(data["military_power"]));
    } else {
      this.militaryPower = 0;
    }

    this.name = asString(data["name"]);

    if (data["overlord"]) {
      this.overlordId = asString(data["overlord"]);
    }

    if (typeof data["ruler"] !== "undefined") {
      this.rulerId = asString(data["ruler"]);
    }

    this.starbaseCapacity = parseInt(asString(data["starbase_capacity"]), 10);

    if (typeof data["subject_date"] !== "undefined") {
      this.subjectDate = asString(data["subject_date"]);
    }

    if (typeof data["subject_type"] !== "undefined") {
      this.subjectType = asString(data["subject_type"]);
    }

    if (typeof data["traditions"] !== "undefined") {
      this.traditions = asArray(data["traditions"]).map(asString);
    } else {
      this.traditions = [];
    }

    this.type = asString(data["type"]);

    this.victoryRank = parseInt(asString(data["victory_rank"]), 10);
    this.victoryScore = parseFloat(asString(data["victory_score"]));
  }
}

const ETHIC_MAPPING: { [key: string]: Ethic } = {
  ethic_authoritarian: Ethic.Authoritarian,
  ethic_egalitarian: Ethic.Egalitarian,
  ethic_fanatic_authoritarian: Ethic.FanaticAuthoritarian,
  ethic_fanatic_egalitarian: Ethic.FanaticEgalitarian,
  ethic_fanatic_materialist: Ethic.FanaticMaterialist,
  ethic_fanatic_militarist: Ethic.FanaticMilitarist,
  ethic_fanatic_pacifist: Ethic.FanaticPacifist,
  ethic_fanatic_spiritualist: Ethic.FanaticSpiritualist,
  ethic_fanatic_xenophile: Ethic.FanaticXenophile,
  ethic_fanatic_xenophobe: Ethic.FanaticXenophobe,
  ethic_gestalt_consciousness: Ethic.GestaltConsciousness,
  ethic_materialist: Ethic.Materialist,
  ethic_militarist: Ethic.Militarist,
  ethic_pacifist: Ethic.Pacifist,
  ethic_spiritualist: Ethic.Spiritualist,
  ethic_xenophile: Ethic.Xenophile,
  ethic_xenophobe: Ethic.Xenophobe
};
