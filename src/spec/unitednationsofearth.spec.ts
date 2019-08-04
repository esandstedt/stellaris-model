import { load, Model, Player, Country, Fleet } from "..";
import { FactionImpl } from "../model/faction";
import { LeaderImpl } from "../model/leader";
import { PopImpl } from "../model/pop";
import { SpeciesImpl } from "../model/species";
import { Leader } from "../model/interfaces";
import { Collection } from "../model/collection";

const filePath = "savefiles/unitednationsofearth.sav";

describe("unitednationsofearth", () => {
  let model: Model;
  beforeAll(async () => {
    console.time("model");
    model = await load(filePath);
    console.timeEnd("model");
  });

  function getCountryByName(name: string) {
    return model.countries.getAll().filter(x => x.name === name)[0];
  }

  function getPlanetByName(name: string) {
    return model.planets.getAll().filter(planet => planet.name === name)[0];
  }

  function getSystemByName(name: string) {
    return model.systems.getAll().filter(x => x.name === name)[0];
  }

  test("loads savefile name", () => {
    expect(model.name).toEqual("United Nations of Earth");
  });

  test("loads savefile date", () => {
    expect(model.date).toEqual("2246.12.11");
  });

  test("loads savefile version", () => {
    expect(model.version).toEqual("Wolfe v2.3.2");
  });

  test("loads player", () => {
    const keys = model.players.getAll().map(player => player.name);
    expect(keys).toEqual(["Goose"]);
  });

  test("links player to their country", () => {
    const player = model.players.get("Goose");
    if (typeof player === "undefined") {
      expect(player).not.toBeUndefined();
      return;
    }

    const country = model.countries.get("0");
    if (typeof country === "undefined") {
      expect(country).not.toBeUndefined();
      return;
    }

    expect(country.name).toEqual("United Nations of Earth");

    expect(player.country).toBe(country);
  });

  test("links country to their owned planets", () => {
    const player = model.players.get("Goose");
    if (typeof player === "undefined") {
      expect(player).not.toBeUndefined();
      return;
    }

    const country = player.country;
    if (typeof country === "undefined") {
      expect(country).not.toBeUndefined();
      return;
    }

    const planetNames = new Set(country.ownedPlanets.map(x => x.name));
    expect(planetNames).toEqual(
      new Set(["Earth", "Oda", "Asgard", "Tokugawa"])
    );

    country.ownedPlanets.forEach(planet => {
      expect(planet.owner).toBe(country);
    });
  });

  test("links planet to their system", () => {
    function check(planetName: string, systemName: string) {
      const planet = getPlanetByName(planetName);

      const system = planet.system;
      if (typeof system === "undefined") {
        expect(system).not.toBeUndefined();
        return;
      }

      expect(system.name).toEqual(systemName);
      expect(system.planets.some(p => p.name === planetName)).toBe(true);
    }

    check("Earth", "Sol");
    check("Luna", "Sol");
    check("Oda", "NAME_Alpha_Centauri");
    check("Asgard", "NAME_Sirius");
    check("Tokugawa", "Chiiban");
  });

  test("loads planet colonization date", () => {
    function check(planetName: string, date: string) {
      const planet = getPlanetByName(planetName);
      expect(planet.colonizeDate).toEqual(date);
    }

    check("Earth", "2200.01.01");
    check("Oda", "2215.08.01");
    check("Asgard", "2220.08.01");
    check("Tokugawa", "2226.10.01");
  });

  test("links country to their controlled planets", () => {
    function check(countryName: string, planetNames: string[]) {
      const country = getCountryByName(countryName);
      expect(country).not.toBeUndefined();

      expect(new Set(country.controlledPlanets.map(x => x.name))).toEqual(
        new Set(planetNames)
      );

      country.controlledPlanets.forEach(planet => {
        expect(planet.controller).toEqual(country);
      });
    }

    // primitive civilizations
    check("Vhemm Civilization", ["Saraklis III"]);
    check("Izki Civilization", ["Uprfarvis I"]);
    // maurader
    check("Krithakkan Braves", ["Duracchus", "Reddor", "Talan"]);
    // fallen empire
    check("Buvhondon Forerunners", [
      "6467-36367",
      "Immuthin",
      "NAME_Brother",
      "NAME_Cradle",
      "NAME_Mother",
      "NAME_The_Preserve",
      "Nietz",
      "Nietz I",
      "Nietz V",
      "Nostea",
      "Nostea I",
      "Nostea IV",
      "Tystra",
      "Unur",
      "VK1-44-D1",
      "W112-951",
      "Walmoro",
      "Walmoro II",
      "Walmoro IV",
      "Zeldrah",
      "Zom",
      "Zom I",
      "Zom IV",
      "Zom Va"
    ]);
  });

  test("links pops to thier planet", () => {
    model.pops
      .getAll()
      .map(pop => pop as PopImpl)
      .forEach(pop => {
        expect(pop.planetId).not.toBeUndefined();

        if (typeof pop.planet === "undefined") {
          expect(pop.planet).not.toBeUndefined();
          return;
        }

        expect(pop.planet.id).toEqual(pop.planetId);
        expect(pop.planet.pops.some(x => x === pop)).toEqual(true);
      });
  });

  test("links pops to their faction", () => {
    model.pops
      .getAll()
      .map(pop => pop as PopImpl)
      .forEach(pop => {
        if (pop.factionId) {
          if (typeof pop.faction === "undefined") {
            expect(pop.faction).not.toBeUndefined();
            return;
          }
          expect(pop.faction.id).toEqual(pop.factionId);
          expect(pop.faction.pops.some(x => x === pop)).toEqual(true);
        } else {
          expect(pop.faction).toBeUndefined();
        }
      });
  });

  test("links factions to thier country", () => {
    model.factions
      .getAll()
      .map(faction => faction as FactionImpl)
      .forEach(faction => {
        expect(faction.countryId).not.toBeUndefined();

        if (typeof faction.country === "undefined") {
          expect(faction.country).not.toBeUndefined();
          return;
        }

        expect(faction.country.id).toEqual(faction.countryId);
        expect(faction.country.factions.some(x => x === faction)).toEqual(true);
      });
  });

  test("links species to their home planet", () => {
    model.species
      .map(species => species as SpeciesImpl)
      .forEach(species => {
        if (species.homePlanetId) {
          if (typeof species.homePlanet === "undefined") {
            expect(species.homePlanet).not.toBeUndefined();
            return;
          }
          expect(species.homePlanet.id).toEqual(species.homePlanetId);
        } else {
          expect(species.homePlanet).toBeUndefined();
        }
      });
  });

  test("links leaders to their species", () => {
    model.leaders
      .getAll()
      .map(leader => leader as LeaderImpl)
      .forEach(leader => {
        if (typeof leader.species === "undefined") {
          expect(leader.species).not.toBeUndefined();
          return;
        }

        expect(leader.species).toBe(model.species[leader.speciesIndex]);
        expect(leader.species.leaders.some(x => x === leader)).toBe(true);
      });
  });

  test("links pops to their species", () => {
    model.pops
      .getAll()
      .map(pop => pop as PopImpl)
      .forEach(pop => {
        if (typeof pop.species === "undefined") {
          expect(pop.species).not.toBeUndefined();
          return;
        }

        expect(pop.species).toBe(model.species[pop.speciesIndex]);
        expect(pop.species.pops.some(x => x === pop)).toBe(true);
      });
  });

  test("all factions have a leader", () => {
    model.factions
      .getAll()
      .map(faction => faction as FactionImpl)
      .forEach(faction => expect(faction.leader).not.toBeUndefined());
  });

  test("all wormholes have a system", () => {
    model.wormholes
      .getAll()
      .forEach(wormhole => expect(wormhole.system).not.toBeUndefined());
  });

  test("all wormholes have a link", () => {
    model.wormholes.getAll().forEach(wormhole => {
      expect(wormhole.link).not.toBeUndefined();
    });
  });

  test("all starbases have a system", () => {
    model.starbases.getAll().forEach(starbase => {
      expect(starbase.system).not.toBeUndefined();
    });
  });

  test("all starbases have an owner", () => {
    model.starbases.getAll().forEach(starbase => {
      const { owner } = starbase;

      expect(owner).not.toBeUndefined();
      expect(owner.starbases.some(x => x === starbase)).toBe(true);
    });
  });

  test("starbases and systems link correctly", () => {
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

  test("all fleets have an owner", () => {
    model.fleets.getAll().forEach(fleet => {
      const { owner } = fleet;

      expect(owner).not.toBeUndefined();
      expect(owner.fleets.some(x => x === fleet)).toBe(true);
    });
  });

  test("all ships have a fleet", () => {
    model.ships.getAll().forEach(ship => {
      const { fleet } = ship;

      expect(fleet).not.toBeUndefined();
      expect(fleet.ships.some(x => x === ship)).toBe(true);
    });
  });

  test("loads player's military fleets correctly", () => {
    const player = model.players.get("Goose") as Player;
    expect(player).not.toBeUndefined();

    const fleets = (player.country as Country).fleets.filter(
      x => !x.isStation && !x.isCivilian
    );
    expect(fleets.length).toBe(1);

    const fleet = fleets[0];
    expect(fleet).not.toBeUndefined();

    const { ships, system } = fleet;
    const leaders = fleet.ships
      .map(x => x.leader)
      .filter(x => typeof x !== "undefined") as Leader[];

    expect(system).not.toBeUndefined();
    expect(system.name).toEqual("Sol");

    expect(leaders.length).toBe(1);
    expect(leaders[0].name).toEqual("Jean Gagne");

    expect(ships.length).toEqual(12);
    const shipNames = new Set(ships.map(x => x.name));
    expect(shipNames.has("UNS Tapir")).toBe(true);
    expect(shipNames.has("UNS Semiramis")).toBe(true);
    expect(shipNames.has("UNS Baracca")).toBe(true);
    expect(shipNames.has("UNS Caldwell")).toBe(true);
    expect(shipNames.has("UNS Pata")).toBe(true);
    expect(shipNames.has("UNS Khanda")).toBe(true);
    expect(shipNames.has("UNS Meihong")).toBe(true);
    expect(shipNames.has("UNS MacLachlan")).toBe(true);
    expect(shipNames.has("UNS Adler")).toBe(true);
    expect(shipNames.has("UNS Haifeng")).toBe(true);
    expect(shipNames.has("UNS Hellcat")).toBe(true);
    expect(shipNames.has("UNS Wolverine")).toBe(true);
  });

  test("loads player's civilian fleets correctly", () => {
    const player = model.players.get("Goose") as Player;
    expect(player).not.toBeUndefined();

    const fleets = (player.country as Country).fleets.filter(
      x => !x.isStation && x.isCivilian
    );
    expect(fleets.length).toBe(9);

    // Lookup by name
    const collection = new Collection(fleets, x => x.name);

    function checkFleet(
      shipName: string,
      systemName: string,
      leaderName?: string
    ) {
      const fleet = collection.get(shipName) as Fleet;
      expect(fleet).not.toBeUndefined();
      expect(fleet.system.name).toEqual(systemName);
      expect(fleet.ships.length).toEqual(1);
      expect(fleet.ships[0].name).toEqual(shipName);

      const leaders = fleet.ships
        .map(x => x.leader)
        .filter(x => typeof x !== "undefined")
        .map(x => x as Leader);

      if (typeof leaderName !== "undefined") {
        expect(leaders.length).toEqual(1);
        const leader = leaders[0];
        expect(leader.name).toEqual(leaderName);
      } else {
        expect(leaders.length).toEqual(0);
      }
    }

    // Construction fleets
    checkFleet("UNS Rubicon", "Baranik");
    checkFleet("UNS Volga", "Dirmius");
    checkFleet("UNS Amazon", "Lawam");
    checkFleet("UNS India", "Sol");
    // Science fleets
    checkFleet("UNS Newton", "Sol", "Mohammad Abbas");
    checkFleet("UNS Lagrange", "Rurius", "Antonietta Gambadori");
    checkFleet("UNS Santa Maria", "NAME_Alpha_Centauri", "Alma Adwam");
    checkFleet("UNS James Cook", "Zantaris Black Hole", "Badru Bankole");
    // Colony fleet
    checkFleet("UNS Jamaica", "Ebrxinda");
  });
});
