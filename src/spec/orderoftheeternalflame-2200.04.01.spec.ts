import { loadPath } from ".";
import { Model } from "..";
import invariants from "./invariants";

const filePath = "savefiles/orderoftheeternalflame-2200.04.01.sav";

describe("orderoftheeternalflame-2200.04.01", () => {
  let model: Model;
  beforeAll(async () => {
    console.time("model");
    model = await loadPath(filePath);
    console.timeEnd("model");
  });

  invariants(() => model);

  test("no factions", () => {
    expect(model.factions.getAll().length).toEqual(0);
  });
});
