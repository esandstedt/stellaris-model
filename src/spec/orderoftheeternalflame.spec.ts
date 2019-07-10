import fs from "fs";

import { load, Model } from "..";

const filePath = "savefiles/orderoftheeternalflame.sav";

describe("unitednationsofearth", () => {
  let model: Model;
  beforeAll(async () => {
    console.time("model");
    model = await load(filePath);
    console.timeEnd("model");
  });

  test("must contain at least one test", () => {});
});
