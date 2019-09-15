import { Model } from "..";
import { loadPath } from ".";
import { LeaderType, Country, Leader } from "../model/interfaces";

const filePath = "savefiles/orderoftheeternalflame-2362.07.01.sav";

describe("orderoftheeternalflame-2362.07.01", () => {
  let model: Model;
  beforeAll(async () => {
    console.time("model");
    model = await loadPath(filePath);
    console.timeEnd("model");
  });

  test("some factions do not have a leader", () => {
    expect(
      model.factions
        .getAll()
        .some(faction => typeof faction.leader === "undefined")
    ).toBe(true);
  });

  test("country overlord is supported", () => {
    const data = [
      { countryId: "38", overlordId: "3" },
      { countryId: "16777251", overlordId: "21" },
      { countryId: "16777275", overlordId: "1" },
      { countryId: "218103879", overlordId: "21" }
    ];

    data.forEach(({ countryId, overlordId }) => {
      const country = model.countries.get(countryId);

      if (typeof country === "undefined") {
        expect(country).not.toBeUndefined();
        return;
      }

      const overlord = model.countries.get(overlordId);
      if (typeof overlord === "undefined") {
        expect(overlord).not.toBeUndefined();
        return;
      }

      if (typeof country.overlord === "undefined") {
        expect(country.overlord).not.toBeUndefined();
        return;
      }

      expect(country.overlord).toBe(overlord);
      expect(overlord.subjects.some(x => x === country)).toBe(true);
    });
  });

  test("all armies have an owner", () => {
    model.armies
      .getAll()
      .forEach(army => expect(army.owner).not.toBeUndefined());
  });

  test("all ships have a design", () => {
    model.ships
      .getAll()
      .forEach(ship => expect(ship.design).not.toBeUndefined());
  });

  test("all sectors have a capital", () => {
    model.sectors
      .getAll()
      .forEach(sector => expect(sector.capital).not.toBeUndefined());
  });

  test("all alliances have members and a leader", () => {
    model.alliances.getAll().forEach(alliance => {
      expect(2 <= alliance.members.length).toBe(true);

      alliance.members.forEach(country => {
        expect(country.alliance).toBe(alliance);
      });

      const memberSet = new Set(alliance.members);

      expect(alliance.leader).not.toBeUndefined();
      expect(memberSet.has(alliance.leader)).toBe(true);
    });
  });

  test("all rulers are linked to their country", () => {
    model.leaders
      .getAll()
      .filter(leader => leader.type === LeaderType.Ruler)
      .forEach(leader => {
        const country = leader.country as Country;
        expect(country).not.toBeUndefined();

        const ruler = country.ruler as Leader;
        const heir = country.heir as Leader;

        expect(leader === ruler || leader === heir).toBe(true);
      });
  });

  test("loads specific war correctly", () => {
    const war = model.wars.get("67108871");

    if (typeof war === "undefined") {
      expect(war).not.toBeUndefined();
      return;
    }

    expect(war.name).toEqual("Till'Lynesian - Mitron Annexation Attempt");
    expect(war.startDate).toEqual("2351.02.22");
    expect(war.attackerWarGoals).toEqual(["wg_conquest"]);
    expect(war.defenderWarGoals).toEqual(["wg_conquest"]);
    expect(war.attackerWarExhaustion).toEqual(0.548);
    expect(war.defenderWarExhaustion).toEqual(0.548);

    // Attackers
    expect(war.attackers.length).toEqual(1);

    (() => {
      const participant = war.attackers[0];
      expect(participant.callType).toEqual("primary");
      expect(participant.country).not.toBeUndefined();
      expect(participant.country.id).toEqual("9");
      expect(participant.caller).toBeUndefined();
    })();

    // Defenders
    expect(war.defenders.length).toEqual(3);

    (() => {
      const participant = war.defenders[0];
      expect(participant.callType).toEqual("primary");
      expect(participant.country).not.toBeUndefined();
      expect(participant.country.id).toEqual("12");
      expect(participant.caller).toBeUndefined();
    })();

    (() => {
      const participant = war.defenders[1];
      expect(participant.callType).toEqual("defensive");
      expect(participant.country).not.toBeUndefined();
      expect(participant.country.id).toEqual("6");

      if (typeof participant.caller === "undefined") {
        expect(participant.caller).not.toBeUndefined();
        return;
      }

      expect(participant.caller.id).toEqual("12");
    })();

    (() => {
      const participant = war.defenders[2];
      expect(participant.callType).toEqual("defensive");
      expect(participant.country).not.toBeUndefined();
      expect(participant.country.id).toEqual("10");

      if (typeof participant.caller === "undefined") {
        expect(participant.caller).not.toBeUndefined();
        return;
      }

      expect(participant.caller.id).toEqual("12");
    })();

    // Battles
    expect(war.battles.length).toEqual(21);

    (() => {
      const battle = war.battles[0];
      expect(battle.type).toEqual("ships");
      expect(battle.date).toEqual("2354.02.05");

      expect(battle.attackers.length).toEqual(1);
      expect(battle.attackers[0].id).toEqual("9");
      expect(battle.attackerLosses).toEqual(4);
      expect(battle.attackerWarExhaustion).toEqual(0.04);

      expect(battle.defenders.length).toEqual(1);
      expect(battle.defenders[0].id).toEqual("12");
      expect(battle.defenderLosses).toEqual(0);
      expect(battle.defenderWarExhaustion).toEqual(0);

      if (typeof battle.system === "undefined") {
        expect(battle.system).not.toBeUndefined();
        return;
      }
      expect(battle.system.id).toEqual("369");

      expect(battle.planet).toBeUndefined();

      expect(battle.victor).toEqual("defender");
    })();

    (() => {
      const battle = war.battles[11];
      expect(battle.type).toEqual("armies");
      // expect(battle.date).toEqual("1.01.01");

      expect(battle.attackers.length).toEqual(1);
      expect(battle.attackers[0].id).toEqual("6");
      expect(battle.attackerLosses).toEqual(0);
      expect(battle.attackerWarExhaustion).toEqual(0);

      expect(battle.defenders.length).toEqual(1);
      expect(battle.defenders[0].id).toEqual("9");
      expect(battle.defenderLosses).toEqual(0);
      expect(battle.defenderWarExhaustion).toEqual(0);

      if (typeof battle.system === "undefined") {
        expect(battle.system).not.toBeUndefined();
        return;
      }
      expect(battle.system.id).toEqual("52");

      if (typeof battle.planet === "undefined") {
        expect(battle.planet).not.toBeUndefined();
        return;
      }
      expect(battle.planet.id).toEqual("894");

      expect(battle.victor).toEqual("attacker");
    })();
  });
});
