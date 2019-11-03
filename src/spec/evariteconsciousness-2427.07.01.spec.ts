import { Model } from "..";
import { loadPath } from ".";
import invariants from "./invariants";

const filePath = "savefiles/evariteconsciousness-2427.07.01.sav";

describe("evariteconsciousness-2427.07.01", () => {
  let model: Model;
  beforeAll(async () => {
    console.time("model");
    model = await loadPath(filePath);
    console.timeEnd("model");
  });

  invariants(() => model);
});
