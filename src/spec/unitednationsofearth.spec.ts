import fs from "fs";

import { Model } from "../model";

const filePath = "savefiles/unitednationsofearth.sav";

describe("unitednationsofearth", () => {
  let model: Model;
  beforeAll(async () => {
    model = await Model.from(fs.readFileSync(filePath).buffer);
  });

  function getCountryByName(name: string) {
    return Object.keys(model.countries)
      .map(key => model.countries[key])
      .filter(x => x.name === name)[0];
  }

  function getPlanetByName(name: string) {
    return Object.keys(model.planets)
      .map(key => model.planets[key])
      .filter(planet => planet.name === name)[0];
  }

  function getSystemByName(name: string) {
    return Object.keys(model.systems)
      .map(key => model.systems[key])
      .filter(x => x.name === name)[0];
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
    const keys = Object.keys(model.players);
    expect(keys).toEqual(["Goose"]);
  });

  test("links player to their country", () => {
    const player = model.players["Goose"];

    const country = model.countries["0"];
    expect(country.name).toEqual("United Nations of Earth");

    expect(player.country).toBe(country);
  });

  test("links country to their owned planets", () => {
    const country = model.players["Goose"].country;

    if (typeof country === "undefined") {
      expect(true).toBe(false);
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
});
