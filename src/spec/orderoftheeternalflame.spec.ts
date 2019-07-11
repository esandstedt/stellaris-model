import { load, Model } from "..";

const filePath = "savefiles/orderoftheeternalflame.sav";

describe("unitednationsofearth", () => {
  let model: Model;
  beforeAll(async () => {
    console.time("model");
    model = await load(filePath);
    console.timeEnd("model");
  });

  test("all pops have a species", () => {
    Object.keys(model.pops)
      .map(key => model.pops[key])
      .forEach(pop => expect(pop.species).not.toBeUndefined());
  });

  test("all pops have a planet", () => {
    Object.keys(model.pops)
      .map(key => model.pops[key])
      .forEach(pop => expect(pop.planet).not.toBeUndefined());
  });

  test("all planets have a system", () => {
    Object.keys(model.planets)
      .map(key => model.planets[key])
      .forEach(planet => expect(planet.system).not.toBeUndefined());
  });

  test("all leaders have a species", () => {
    Object.keys(model.leaders)
      .map(key => model.leaders[key])
      .forEach(leader => expect(leader.species).not.toBeUndefined());
  });

  test("all factions have a country", () => {
    Object.keys(model.factions)
      .map(key => model.factions[key])
      .forEach(faction => expect(faction.country).not.toBeUndefined());
  });

  test("all factions have a leader", () => {
    Object.keys(model.factions)
      .map(key => model.factions[key])
      .forEach(faction => expect(faction.leader).not.toBeUndefined());
  });
});
