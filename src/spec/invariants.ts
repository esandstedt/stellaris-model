import { Model, Leader, LeaderType, Country } from "..";

export default (getModel: () => Model) => {
  describe("invariants", () => {
    test("all pops have a species", () => {
      getModel()
        .pops.getAll()
        .forEach(pop => expect(pop.species).not.toBeUndefined());
    });

    test("all pops have a planet", () => {
      getModel()
        .pops.getAll()
        .forEach(pop => expect(pop.planet).not.toBeUndefined());
    });

    test("all planets have a system", () => {
      getModel()
        .planets.getAll()
        .forEach(planet => expect(planet.system).not.toBeUndefined());
    });

    test("all leaders have a species", () => {
      getModel()
        .leaders.getAll()
        .forEach(leader => expect(leader.species).not.toBeUndefined());
    });

    test("all factions have a country", () => {
      getModel()
        .factions.getAll()
        .forEach(faction => expect(faction.country).not.toBeUndefined());
    });

    test("leaders can only be linked to one ship", () => {
      const leaderIdSet = new Set<string>();

      getModel()
        .ships.getAll()
        .filter(x => typeof x.leader !== "undefined")
        .forEach(ship => {
          const { id } = ship.leader as Leader;
          expect(leaderIdSet.has(id)).toBe(false);
          leaderIdSet.add(id);
        });
    });

    test("all armies have an owner", () => {
      getModel()
        .armies.getAll()
        .forEach(army => expect(army.owner).not.toBeUndefined());
    });

    test("all ships have a fleet", () => {
      getModel()
        .ships.getAll()
        .forEach(ship => {
          const { fleet } = ship;

          expect(fleet).not.toBeUndefined();
          expect(fleet.ships.some(x => x === ship)).toBe(true);
        });
    });

    test("all ships have a design", () => {
      getModel()
        .ships.getAll()
        .forEach(ship => expect(ship.design).not.toBeUndefined());
    });

    test("all sectors have a capital", () => {
      getModel()
        .sectors.getAll()
        .forEach(sector => expect(sector.capital).not.toBeUndefined());
    });

    test("all alliances have members and a leader", () => {
      getModel()
        .alliances.getAll()
        .forEach(alliance => {
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
      getModel()
        .leaders.getAll()
        .filter(leader => leader.type === LeaderType.Ruler)
        .forEach(leader => {
          const country = leader.country as Country;
          expect(country).not.toBeUndefined();

          const ruler = country.ruler as Leader;
          const heir = country.heir as Leader;

          expect(leader === ruler || leader === heir).toBe(true);
        });
    });

    test("all wormholes have a system", () => {
      getModel()
        .wormholes.getAll()
        .forEach(wormhole => expect(wormhole.system).not.toBeUndefined());
    });

    test("all wormholes have a link", () => {
      getModel()
        .wormholes.getAll()
        .forEach(wormhole => {
          expect(wormhole.link).not.toBeUndefined();
        });
    });

    test("all starbases have a system", () => {
      getModel()
        .starbases.getAll()
        .forEach(starbase => {
          expect(starbase.system).not.toBeUndefined();
        });
    });

    test("all starbases have an owner", () => {
      getModel()
        .starbases.getAll()
        .forEach(starbase => {
          const { owner } = starbase;

          expect(owner).not.toBeUndefined();
          expect(owner.starbases.some(x => x === starbase)).toBe(true);
        });
    });

    test("starbases and systems link correctly", () => {
      const model = getModel();

      model.starbases.getAll().forEach(starbase => {
        const { system } = starbase;

        expect(system).not.toBeUndefined();

        if (typeof system.starbase === "undefined") {
          expect(system.starbase).not.toBeUndefined();
        }

        expect(system.starbase).toBe(starbase);
      });

      model.systems.getAll().forEach(system => {
        const { starbase } = system;

        if (typeof starbase !== "undefined") {
          expect(starbase.system).toBe(system);
        }
      });
    });
  });
};
