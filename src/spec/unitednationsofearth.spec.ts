import { Model } from "../model";

import fs from "fs";
import { Country } from "../model/country";

const filePath = "savefiles/unitednationsofearth.sav";

describe("unitednationsofearth", () => {
  let model: Model;

  function getPlanetByName(name: string) {
    return Object.keys(model.planets)
      .map(key => model.planets[key])
      .filter(planet => planet.name === name)[0];
  }

  beforeAll(async () => {
    model = await Model.from(fs.readFileSync(filePath).buffer);
  });

  test("loads the savefile name", () => {
    expect(model.name).toEqual("United Nations of Earth");
  });

  test("loads the savefile date", () => {
    expect(model.date).toEqual("2246.12.11");
  });

  test("loads the savefile version", () => {
    expect(model.version).toEqual("Wolfe v2.3.2");
  });

  test("loads the player", () => {
    const keys = Object.keys(model.players);
    expect(keys).toEqual(["Goose"]);
  });

  test("links the player to their country", () => {
    const player = model.players["Goose"];

    const country = model.countries["0"];
    expect(country.name).toEqual("United Nations of Earth");

    expect(player.country).toBe(country);
  });

  test("links the player's country to their owned planets", () => {
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

  test("links planets to their system", () => {
    function check(planetName: string, systemName: string) {
      const planet = getPlanetByName(planetName);

      const system = planet.system;
      if (typeof system === "undefined") {
        expect(system).not.toBeUndefined();
        return;
      }

      expect(system.name).toEqual(systemName);
    }

    check("Earth", "Sol");
    check("Luna", "Sol");
    check("Oda", "NAME_Alpha_Centauri");
    check("Asgard", "NAME_Sirius");
    check("Tokugawa", "Chiiban");
  });

  test("loads planet's colonization date", () => {
    function check(planetName: string, date: string) {
      const planet = getPlanetByName(planetName);
      expect(planet.colonizeDate).toEqual(date);
    }

    check("Earth", "2200.01.01");
    check("Oda", "2215.08.01");
    check("Asgard", "2220.08.01");
    check("Tokugawa", "2226.10.01");
  });
});
