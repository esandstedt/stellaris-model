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

    this.countries = this.getModels(
      asPairArray(data["country"]),
      (id, pairs) => new Country(id, pairs)
    );

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

    this.systems = this.getModels(
      systemPairs,
      (id, pairs) => new System(id, pairs)
    );

    this.linkSystemsByHyperlanes(systemPairs);

    this.addModelReference(
      this.players,
      this.countries,
      x => x.countryId,
      (player, country) => (player.country = country)
    );

    this.addModelReference(
      this.planets,
      this.countries,
      x => x.controllerId,
      (planet, country) => {
        planet.controller = country;
        country.controlledPlanets.push(planet);
      }
    );

    this.addModelReference(
      this.planets,
      this.countries,
      x => x.ownerId,
      (planet, country) => {
        planet.owner = country;
        country.ownedPlanets.push(planet);
      }
    );

    this.addModelReference(
      this.planets,
      this.systems,
      x => x.systemId,
      (planet, system) => {
        planet.system = system;
        system.planets.push(planet);
      }
    );

    this.addModelReference(
      this.pops,
      this.factions,
      x => x.factionId,
      (pop, faction) => {
        pop.faction = faction;
        faction.pops.push(pop);
      }
    );

    this.addModelReference(
      this.pops,
      this.planets,
      x => x.planetId,
      (pop, planet) => {
        pop.planet = planet;
        planet.pops.push(pop);
      }
    );

    this.addModelReference(
      this.factions,
      this.countries,
      x => x.countryId,
      (faction, country) => {
        faction.country = country;
        country.factions.push(faction);
      }
    );
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

      if (typeof pair.value === "string") {
        if (pair.value === "none") {
          // Ignore
        } else {
          throw new Error("unrecognized value");
        }
      } else {
        const modelPairs = pair.value;
        modelPairs.forEach(p => keySet.add(p.key));
        const model = createFunc(pair.key, modelPairs);
        result[pair.key] = model;
      }
    });

    if (logKeys) {
      const keyArray = Array.from(keySet);
      keyArray.sort();
      console.log(keyArray);
    }

    return result;
  }

  private addModelReference<T1, T2>(
    modelSet: { [id: string]: T1 },
    referenceSet: { [id: string]: T2 },
    keyGetter: (model: T1) => string | undefined,
    setter: (model: T1, reference: T2) => void
  ) {
    Object.keys(modelSet)
      .map(key => modelSet[key])
      .forEach(model => {
        const key = keyGetter(model);
        if (typeof key !== "undefined") {
          const reference = referenceSet[key];
          if (reference) {
            setter(model, reference);
          }
        }
      });
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
}
