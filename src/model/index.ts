import { asDictionary, asArray, asString, Pair, asPairArray } from "../compile";

import { Player, PlayerImpl } from "./player";
import { System, SystemImpl } from "./system";
import { Hyperlane } from "./system/hyperlane";
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
  public countries: { [id: string]: CountryImpl };
  public date: string;
  public factions: { [id: string]: FactionImpl };
  public leaders: { [id: string]: LeaderImpl };
  public name: string;
  public planets: { [id: string]: PlanetImpl };
  public players: { [name: string]: PlayerImpl };
  public pops: { [id: string]: PopImpl };
  public requiredDlcs: string[];
  public species: SpeciesImpl[];
  public systems: { [id: string]: SystemImpl };
  public version: string;

  constructor(pairs: Pair[]) {
    const data = asDictionary(pairs);

    this.version = asString(data["version"]);
    this.name = asString(data["name"]);
    this.date = asString(data["date"]);

    this.requiredDlcs = asArray(asPairArray(data["required_dlcs"])).map(
      asString
    );

    const systemPairs = asPairArray(data["galactic_object"]);

    this.countries = this.getModels(
      asPairArray(data["country"]),
      (id, p) => new CountryImpl(id, p)
    );

    this.factions = this.getModels(
      asPairArray(data["pop_factions"]),
      (id, p) => new FactionImpl(id, p)
    );

    this.leaders = this.getModels(
      asPairArray(data["leaders"]),
      (id, p) => new LeaderImpl(id, p)
    );

    this.planets = this.getPlanets(asPairArray(data["planets"]));
    this.players = this.getPlayers(asPairArray(data["player"]));

    this.pops = this.getModels(
      asPairArray(data["pop"]),
      (id, p) => new PopImpl(id, p)
    );

    this.species = this.getSpecies(asPairArray(data["species"]));

    this.systems = this.getModels(
      systemPairs,
      (id, p) => new SystemImpl(id, p)
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
    createFunc: (id: string, pairs: Pair[]) => T
  ) {
    const result: { [id: string]: T } = {};

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
        result[pair.key] = createFunc(pair.key, pair.value);
      }
    });

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

    const array = asArray(pairs, "planet");
    if (array.length !== 1) {
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

  private getSpecies(pairs: Pair[]) {
    return pairs.map(pair => new SpeciesImpl(asPairArray(pair.value)));
  }

  private linkSystemsByHyperlanes(pairs: Pair[]) {
    pairs.map(pair => {
      if (pair.key === null) {
        throw new Error();
      }

      const system = this.systems[pair.key];

      const systemData = asDictionary(asPairArray(pair.value));
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
