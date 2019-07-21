import { load, Model } from "..";

const filePath = "savefiles/orderoftheeternalflame-2291.07.01.sav";

describe("orderoftheeternalflame-2291.07.01", () => {
  let model: Model;
  beforeAll(async () => {
    console.time("model");
    model = await load(filePath);
    console.timeEnd("model");
  });

  test("all pops have a species", () => {
    model.pops.getAll().forEach(pop => expect(pop.species).not.toBeUndefined());
  });

  test("all pops have a planet", () => {
    model.pops.getAll().forEach(pop => expect(pop.planet).not.toBeUndefined());
  });

  test("all planets have a system", () => {
    model.planets
      .getAll()
      .forEach(planet => expect(planet.system).not.toBeUndefined());
  });

  test("all leaders have a species", () => {
    model.leaders
      .getAll()
      .forEach(leader => expect(leader.species).not.toBeUndefined());
  });

  test("all factions have a country", () => {
    model.factions
      .getAll()
      .forEach(faction => expect(faction.country).not.toBeUndefined());
  });

  test("all factions have a leader", () => {
    model.factions
      .getAll()
      .forEach(faction => expect(faction.leader).not.toBeUndefined());
  });
});
