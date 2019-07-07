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
import { Country } from "./country";
import { Pop } from "./pop";
import { Faction } from "./faction";

export class Model {
  static from(data: string | ArrayBuffer | Blob) {
    return compile(data).then(doc => new Model(doc));
  }

  version: string;
  name: string;
  date: string;
  requiredDlcs: string[];

  countries: { [id: string]: Country };
  factions: { [id: string]: Faction };
  planets: { [id: string]: Planet };
  players: { [name: string]: Player };
  pops: { [id: string]: Pop };
  systems: { [id: string]: System };

  constructor(pairs: Pair[]) {
    const data = asDictionary(pairs);

    this.version = asString(data["version"]);
    this.name = asString(data["name"]);
    this.date = asString(data["date"]);

    this.requiredDlcs = asArray(asPairArray(data["required_dlcs"])).map(
      asString
    );

    var systemPairs = asPairArray(data["galactic_object"]);

    this.countries = this.getCountries(asPairArray(data["country"]));

    this.factions = this.getModels(
      asPairArray(data["pop_factions"]),
      (id, pairs) => new Faction(id, pairs)
    );

    this.planets = this.getPlanets(asPairArray(data["planets"]));
    this.players = this.getPlayers(asPairArray(data["player"]));

    this.pops = this.getModels(
      asPairArray(data["pop"]),
      (id, pairs) => new Pop(id, pairs)
    );

    this.systems = this.getSystems(systemPairs);

    this.linkSystemsByHyperlanes(systemPairs);
    this.linkPlayersCountry();
    this.linkPlanetsController();
    this.linkPlanetsOwner();
    this.linkPlanetsSystem();
    this.linkPopsFaction();
    this.linkPopsPlanet();

    this.addForeignReference(
      this.factions,
      "country",
      "countryId",
      this.countries,
      "factions"
    );
  }

  /*
  private printObject(obj: any) {
    console.log(JSON.stringify(obj, null, "\t"));
  }
   */

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

  private getPlanets(pairs: Pair[]) {
    const result: { [id: string]: Planet } = {};

    var array = asArray(pairs, "planet");
    if (array.length != 1) {
      throw new Error("unexpected array length");
    }

    asPairArray(array[0]).forEach(pair => {
      if (pair.key === null) {
        throw new Error();
      }

      const planet = new Planet(pair.key, asPairArray(pair.value));
      result[planet.id] = planet;
    });

    return result;
  }

  private getModels<T>(
    pairs: Pair[],
    createFunc: (id: string, pairs: Pair[]) => T,
    logKeys = false
  ) {
    const result: { [id: string]: T } = {};

    var keySet = new Set<string | null>();

    pairs.map(pair => {
      if (pair.key === null) {
        throw new Error();
      }

      const modelPairs = asPairArray(pair.value);
      modelPairs.forEach(p => keySet.add(p.key));
      const model = createFunc(pair.key, modelPairs);
      result[pair.key] = model;
    });

    if (logKeys) {
      const keyArray = Array.from(keySet);
      keyArray.sort();
      console.log(keyArray);
    }

    return result;
  }

  private linkPlayersCountry() {
    this.addForeignReference(
      this.players,
      "country",
      "countryId",
      this.countries
    );
  }

  private linkPlanetsController() {
    this.addForeignReference(
      this.planets,
      "controller",
      "controllerId",
      this.countries,
      "controlledPlanets"
    );
  }

  private linkPlanetsOwner() {
    this.addForeignReference(
      this.planets,
      "owner",
      "ownerId",
      this.countries,
      "ownedPlanets"
    );
  }

  private linkPlanetsSystem() {
    this.addForeignReference(
      this.planets,
      "system",
      "systemId",
      this.systems,
      "planets"
    );
  }

  private linkPopsFaction() {
    this.addForeignReference(
      this.pops,
      "faction",
      "factionId",
      this.factions,
      "pops"
    );
  }

  private linkPopsPlanet() {
    this.addForeignReference(
      this.pops,
      "planet",
      "planetId",
      this.planets,
      "pops"
    );
  }

  private addForeignReference(
    set: { [id: string]: any },
    referenceProperty: string,
    referenceKeyProperty: string,
    foreignSet: { [id: string]: any },
    foreignArrayProperty: string | null = null
  ) {
    Object.keys(set).forEach(key => {
      var item = set[key];
      var referenceKey = item[referenceKeyProperty];
      const reference = foreignSet[referenceKey];
      if (reference) {
        item[referenceProperty] = reference;

        if (foreignArrayProperty !== null) {
          reference[foreignArrayProperty].push(item);
        }
      }
    });
  }
}
