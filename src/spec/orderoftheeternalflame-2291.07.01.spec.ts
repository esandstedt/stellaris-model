import { loadPath } from ".";
import { Alliance, Country, Leader, Model } from "..";
import invariants from "./invariants";

const filePath = "savefiles/orderoftheeternalflame-2291.07.01.sav";

describe("orderoftheeternalflame-2291.07.01", () => {
  let model: Model;
  beforeAll(async () => {
    console.time("model");
    model = await loadPath(filePath);
    console.timeEnd("model");
  });

  invariants(() => model);

  test("all factions have a leader", () => {
    model.factions
      .getAll()
      .forEach(faction => expect(faction.leader).not.toBeUndefined());
  });

  test("associated alliances are loaded", () => {
    const alliance = model.alliances.get("0") as Alliance;
    const countries = [
      model.countries.get("17") as Country,
      model.countries.get("22") as Country
    ];

    expect(alliance.associates.length).toEqual(2);
    countries.forEach(country => {
      expect(country.associatedAlliance).toBe(alliance);
      expect(alliance.associates.some(x => x === country)).toEqual(true);
    });
  });
});
