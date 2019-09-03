import { Model } from "..";
import { loadPath } from ".";

const filePath = "savefiles/orderoftheeternalflame-2200.04.01.sav";

describe("orderoftheeternalflame-2200.04.01", () => {
  let model: Model;
  beforeAll(async () => {
    console.time("model");
    model = await loadPath(filePath);
    console.timeEnd("model");
  });

  test("no factions at the start", () => {
    expect(model.factions.getAll().length).toEqual(0);
  });
});
