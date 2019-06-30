import {
  compile,
  asDictionary,
  asArray,
  asString,
  Pair,
  asPairArray
} from "../compile";
import { Player } from "./player";
import { System, Hyperlane } from "./system";
import { Planet } from "./planet";
import { Version } from "./version";
import { Country } from "./country";

export class Model {
  static from(data: string | ArrayBuffer | Blob) {
    return compile(data).then(doc => new Model(doc));
  }

  version: Version;
  name: string;
  date: string;
  requiredDlcs: string[];
  players: { [name: string]: Player };
  countries: { [id: string]: Country };
  systems: { [id: string]: System };
  // planets: { [id: string]: Planet };

  constructor(pairs: Pair[]) {
    const data = asDictionary(pairs);

    this.version = new Version(asString(data["version"]));
    this.name = asString(data["name"]);
    this.date = asString(data["date"]);

    this.requiredDlcs = asArray(asPairArray(data["required_dlcs"])).map(
      asString
    );

    this.players = this.getPlayers(asPairArray(data["player"]));
    this.countries = this.getCountries(asPairArray(data["country"]));

    var systemPairs = asPairArray(data["galactic_object"]);
    this.systems = this.getSystems(systemPairs);
    this.linkSystemsByHyperlanes(systemPairs);

    this.linkCountryToPlayers();

    /*
    this.planets = {};
    for (let key in doc["planet"]) {
      let value = doc["planet"][key];
      this.planets[key] = new Planet(key, value);
    }
     */
  }

  private printObject(obj: any) {
    console.log(JSON.stringify(obj, null, "\t"));
  }

  private getPlayers(pairs: Pair[]): { [name: string]: Player } {
    const result: { [name: string]: Player } = {};

    asArray(pairs)
      .map(asPairArray)
      .forEach(item => {
        const player = new Player(item);
        result[player.name] = player;
      });

    return result;
  }

  private getCountries(pairs: Pair[]): { [id: string]: Country } {
    const result: { [id: string]: Country } = {};

    pairs.map(pair => {
      if (pair.key === null) {
        throw new Error();
      }

      if (typeof pair.value === "string") {
        // Ignore
      } else {
        const country = new Country(pair.key, asPairArray(pair.value));
        result[country.id] = country;
      }
    });

    return result;
  }

  private getSystems(pairs: Pair[]): { [id: string]: System } {
    const result: { [id: string]: System } = {};

    pairs.map(pair => {
      if (pair.key === null) {
        throw new Error();
      }

      const system = new System(pair.key, asPairArray(pair.value));
      result[system.id] = system;
    });

    return result;
  }

  private linkSystemsByHyperlanes(pairs: Pair[]) {
    pairs.map(pair => {
      if (pair.key === null) {
        throw new Error();
      }

      const system = this.systems[pair.key];

      var systemData = asDictionary(asPairArray(pair.value));
      if (systemData["hyperlane"]) {
        system.hyperlanes = asArray(asPairArray(systemData["hyperlane"]))
          .map(item => asDictionary(asPairArray(item)))
          .map(
            data =>
              new Hyperlane(
                system,
                this.systems[asString(data["to"])],
                parseFloat(asString(data["length"]))
              )
          );
      } else {
        system.hyperlanes = [];
      }
    });
  }

  private linkCountryToPlayers() {
    this.addForeignReference(
      this.players,
      "country",
      "countryId",
      this.countries
    );
  }

  private addForeignReference(
    set: { [id: string]: any },
    referenceProperty: string,
    foreignKeyProperty: string,
    foreignSet: { [id: string]: any }
  ) {
    Object.keys(set).forEach(key => {
      var obj = set[key];
      const f = foreignSet[obj[foreignKeyProperty]];
      if (f) {
        obj[referenceProperty] = f;
      }
    });
  }

  // Still todo:
  //  - connect Player to Country
  //  - connect System to Planet
}
