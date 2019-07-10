import { asDictionary, asArray, asString, Pair, asPairArray } from "../compile";

import { Player, PlayerImpl } from "./player";
import { System, Hyperlane, SystemImpl } from "./system";
import { Planet, PlanetImpl } from "./planet";
import { Country, CountryImpl } from "./country";
import { Pop, PopImpl } from "./pop";
import { Faction, FactionImpl } from "./faction";
import { Leader, LeaderImpl } from "./leader";
import { Species, SpeciesImpl } from "./species";

export interface Model {
  countries: { [id: string]: Country };
  date: string;
  factions: { [id: string]: Faction };
  leaders: { [id: string]: Leader };
  name: string;
  planets: { [id: string]: Planet };
  players: { [name: string]: Player };
  pops: { [id: string]: Pop };
  requiredDlcs: string[];
  species: Species[];
  systems: { [id: string]: System };
  version: string;
}

export class ModelImpl implements Model {
  version: string;
  name: string;
  date: string;
  requiredDlcs: string[];

  countries: { [id: string]: CountryImpl };
  factions: { [id: string]: FactionImpl };
  leaders: { [id: string]: LeaderImpl };
  planets: { [id: string]: PlanetImpl };
  players: { [name: string]: PlayerImpl };
  pops: { [id: string]: PopImpl };
  species: SpeciesImpl[];
  systems: { [id: string]: SystemImpl };

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
      (id, pairs) => new CountryImpl(id, pairs)
    );

    this.factions = this.getModels(
      asPairArray(data["pop_factions"]),
      (id, pairs) => new FactionImpl(id, pairs)
    );

    this.leaders = this.getModels(
      asPairArray(data["leaders"]),
      (id, pairs) => new LeaderImpl(id, pairs)
    );

    this.planets = this.getPlanets(asPairArray(data["planets"]));
    this.players = this.getPlayers(asPairArray(data["player"]));

    this.pops = this.getModels(
      asPairArray(data["pop"]),
      (id, pairs) => new PopImpl(id, pairs)
    );

    this.species = this.getSpecies(asPairArray(data["species"]));

    this.systems = this.getModels(
      systemPairs,
      (id, pairs) => new SystemImpl(id, pairs)
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

    this.addModelReference(
      this.factions,
      this.leaders,
      x => x.leaderId,
      (faction, leader) => {
        faction.leader = leader;
      }
    );

    this.addModelReference(
      this.leaders,
      this.countries,
      x => x.countryId,
      (leader, country) => {
        leader.country = country;
        country.leaders.push(leader);
      }
    );

    const speciesDict: { [index: string]: SpeciesImpl } = {};
    this.species.forEach((s, i) => (speciesDict[i] = s));

    this.addModelReference(
      speciesDict,
      this.planets,
      x => x.homePlanetId,
      (species, planet) => {
        species.homePlanet = planet;
      }
    );

    this.addSpeciesReference(
      this.leaders,
      this.species,
      x => x.speciesIndex,
      (leader, species) => {
        leader.species = species;
        species.leaders.push(leader);
      }
    );

    this.addSpeciesReference(
      this.pops,
      this.species,
      x => x.speciesIndex,
      (pop, species) => {
        pop.species = species;
        species.pops.push(pop);
      }
    );

    this.addSpeciesReference(
      speciesDict,
      this.species,
      x => x.baseIndex,
      (species, base) => {
        species.base = base;
        base.children.push(species);
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

  private addSpeciesReference<T>(
    modelSet: { [id: string]: T },
    speciesArray: SpeciesImpl[],
    indexGetter: (model: T) => number | undefined,
    setter: (model: T, species: SpeciesImpl) => void
  ) {
    Object.keys(modelSet)
      .map(key => modelSet[key])
      .forEach(model => {
        const index = indexGetter(model);
        if (typeof index !== "undefined") {
          const species = speciesArray[index];
          if (species) {
            setter(model, species);
          } else {
            throw new Error();
          }
        }
      });
  }

  private getPlayers(pairs: Pair[]): { [name: string]: PlayerImpl } {
    const result: { [name: string]: PlayerImpl } = {};

    asArray(pairs)
      .map(asPairArray)
      .forEach(item => {
        const player = new PlayerImpl(item);
        result[player.name] = player;
      });

    return result;
  }

  private getPlanets(pairs: Pair[]) {
    const result: { [id: string]: PlanetImpl } = {};

    var array = asArray(pairs, "planet");
    if (array.length != 1) {
      throw new Error("unexpected array length");
    }

    asPairArray(array[0]).forEach(pair => {
      if (pair.key === null) {
        throw new Error();
      }

      const planet = new PlanetImpl(pair.key, asPairArray(pair.value));
      result[planet.id] = planet;
    });

    return result;
  }

  private getSpecies(pairs: Pair[], logKeys = false) {
    const keys = new Set<string | null>();

    const result = pairs.map(x => {
      const modelPairs = asPairArray(x.value);
      modelPairs.forEach(p => keys.add(p.key));
      return new SpeciesImpl(modelPairs);
    });

    if (logKeys) {
      const list = Array.from(keys);
      list.sort();
      console.log(list);
    }

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
