import fs from "fs";

import { Model } from "../model";
import { from } from "..";

const filePath = "savefiles/orderoftheeternalflame.sav";

describe("unitednationsofearth", () => {
  let model: Model;
  beforeAll(async () => {
    console.time("model");
    model = await from(fs.readFileSync(filePath).buffer);
    console.timeEnd("model");
  });

  test("must contain at least one test", () => {});
});
