import { loadPath } from ".";
import { Model } from "..";
import { Country, Leader, Player } from "../model/interfaces";
import invariants from "./invariants";

const filePath = "savefiles/tzynnempire-2200.01.13.sav";

describe("tzynnempire-2200.01.13", () => {
  let model: Model;
  beforeAll(async () => {
    console.time("model");
    model = await loadPath(filePath);
    console.timeEnd("model");
  });

  invariants(() => model);

  test("correctly sets ruler and heir", () => {
    const player = model.players.get("Goose") as Player;
    expect(player).not.toBeUndefined();

    const country = player.country as Country;
    expect(country).not.toBeUndefined();

    const ruler = country.ruler as Leader;
    expect(ruler).not.toBeUndefined();
    expect(ruler.name).toEqual("Sazzeeja");

    const heir = country.heir as Leader;
    expect(heir).not.toBeUndefined();
    expect(heir.name).toEqual("Torba'Varass");
  });
});
