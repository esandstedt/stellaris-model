import { load, Model } from "..";

const filePath = "savefiles/orderoftheeternalflame-2362.07.01.sav";

describe("orderoftheeternalflame-2362.07.01", () => {
  let model: Model;
  beforeAll(async () => {
    console.time("model");
    model = await load(filePath);
    console.timeEnd("model");
  });

  test("some factions do not have a leader", () => {
    expect(
      model.factions
        .getAll()
        .some(faction => typeof faction.leader === "undefined")
    ).toBe(true);
  });

  test("country overlord is supported", () => {
    const data = [
      { countryId: "38", overlordId: "3" },
      { countryId: "16777251", overlordId: "21" },
      { countryId: "16777275", overlordId: "1" },
      { countryId: "218103879", overlordId: "21" }
    ];

    data.forEach(({ countryId, overlordId }) => {
      const country = model.countries.get(countryId);

      if (typeof country === "undefined") {
        expect(country).not.toBeUndefined();
        return;
      }

      const overlord = model.countries.get(overlordId);
      if (typeof overlord === "undefined") {
        expect(overlord).not.toBeUndefined();
        return;
      }

      if (typeof country.overlord === "undefined") {
        expect(country.overlord).not.toBeUndefined();
        return;
      }

      expect(country.overlord).toBe(overlord);
      expect(overlord.subjects.some(x => x === country)).toBe(true);
    });
  });

  test("all armies have an owner", () => {
    model.armies
      .getAll()
      .forEach(army => expect(army.owner).not.toBeUndefined());
  });
});
