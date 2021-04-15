import { loadPath } from ".";
import { Model } from "..";
import invariants from "./invariants";

const filePath = "savefiles/ironman.sav";

describe("ironman", () => {
  let model: Model;
  beforeAll(async () => {
    console.time("model");
    model = await loadPath(filePath);
    console.timeEnd("model");
  });

  invariants(() => model);
});
