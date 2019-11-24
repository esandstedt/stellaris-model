import { loadPath } from ".";
import { Model } from "..";
import invariants from "./invariants";

const filePath = "savefiles/orderoftheeternalflame-2421.07.03.sav";

describe("orderoftheeternalflame-2421.07.03", () => {
  let model: Model;
  beforeAll(async () => {
    console.time("model");
    model = await loadPath(filePath);
    console.timeEnd("model");
  });

  invariants(() => model);
});
