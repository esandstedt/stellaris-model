import { Model } from "..";
import { loadPath } from ".";

const filePath = "savefiles/orderoftheeternalflame-2300.04.01.sav";

describe("orderoftheeternalflame-2300.04.01", () => {
  let model: Model;
  beforeAll(async () => {
    console.time("model");
    model = await loadPath(filePath);
    console.timeEnd("model");
  });

  test("some fleets have no owner", () => {
    const result = model.fleets
      .getAll()
      .filter(x => typeof x.owner === "undefined");

    expect(result).not.toEqual(0);
  });
});
