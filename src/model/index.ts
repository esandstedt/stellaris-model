import { asDictionary, asArray, asString, Pair, asPairArray } from "../compile";
import { Collection } from "./collection";

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
  countries: Collection<Country>;
  date: string;
  factions: Collection<Faction>;
  leaders: Collection<Leader>;
  name: string;
  planets: Collection<Planet>;
  players: Collection<Player>;
  pops: Collection<Pop>;
  requiredDlcs: string[];
  species: Species[];
  systems: Collection<System>;
  version: string;
}

export class ModelImpl implements Model {
  public countries: Collection<CountryImpl>;
  public date: string;
  public factions: Collection<FactionImpl>;
  public leaders: Collection<LeaderImpl>;
  public name: string;
  public planets: Collection<PlanetImpl>;
  public players: Collection<PlayerImpl>;
  public pops: Collection<PopImpl>;
  public requiredDlcs: string[];
  public species: SpeciesImpl[];
  public systems: Collection<SystemImpl>;
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

    this.countries = this.getCollection(
      asPairArray(data["country"]),
      (id, p) => new CountryImpl(id, p),
      country => country.id
    );

    this.factions = this.getCollection(
      asPairArray(data["pop_factions"]),
      (id, p) => new FactionImpl(id, p),
      faction => faction.id
    );

    this.leaders = this.getCollection(
      asPairArray(data["leaders"]),
      (id, p) => new LeaderImpl(id, p),
      leader => leader.id
    );

    this.planets = this.getPlanets(asPairArray(data["planets"]));
    this.players = this.getPlayers(asPairArray(data["player"]));

    this.pops = this.getCollection(
      asPairArray(data["pop"]),
      (id, p) => new PopImpl(id, p),
      pop => pop.id
    );

    this.species = this.getSpecies(asPairArray(data["species"]));

    this.systems = this.getCollection(
      systemPairs,
      (id, p) => new SystemImpl(id, p),
      system => system.id
    );

    this.linkSystemsByHyperlanes(systemPairs);

    this.addModelReference(
      this.players.getAll(),
      id => this.countries.get(id),
      x => x.countryId,
      (player, country) => (player.country = country)
    );

    this.addModelReference(
      this.planets.getAll(),
      id => this.countries.get(id),
      x => x.controllerId,
      (planet, country) => {
        planet.controller = country;
        country.controlledPlanets.push(planet);
      }
    );

    this.addModelReference(
      this.planets.getAll(),
      id => this.countries.get(id),
      x => x.ownerId,
      (planet, country) => {
        planet.owner = country;
        country.ownedPlanets.push(planet);
      }
    );

    this.addModelReference(
      this.planets.getAll(),
      id => this.systems.get(id),
      x => x.systemId,
      (planet, system) => {
        planet.system = system;
        system.planets.push(planet);
      }
    );

    this.addModelReference(
      this.pops.getAll(),
      id => this.factions.get(id),
      x => x.factionId,
      (pop, faction) => {
        pop.faction = faction;
        faction.pops.push(pop);
      }
    );

    this.addModelReference(
      this.pops.getAll(),
      id => this.planets.get(id),
      x => x.planetId,
      (pop, planet) => {
        pop.planet = planet;
        planet.pops.push(pop);
      }
    );

    this.addModelReference(
      this.factions.getAll(),
      id => this.countries.get(id),
      x => x.countryId,
      (faction, country) => {
        faction.country = country;
        country.factions.push(faction);
      }
    );

    this.addModelReference(
      this.factions.getAll(),
      id => this.leaders.get(id),
      x => x.leaderId,
      (faction, leader) => {
        faction.leader = leader;
      }
    );

    this.addModelReference(
      this.leaders.getAll(),
      id => this.countries.get(id),
      x => x.countryId,
      (leader, country) => {
        leader.country = country;
        country.leaders.push(leader);
      }
    );

    this.addModelReference(
      this.species,
      id => this.planets.get(id),
      x => x.homePlanetId,
      (species, planet) => {
        species.homePlanet = planet;
      }
    );

    this.addSpeciesReference(
      this.leaders.getAll(),
      this.species,
      x => x.speciesIndex,
      (leader, species) => {
        leader.species = species;
        species.leaders.push(leader);
      }
    );

    this.addSpeciesReference(
      this.pops.getAll(),
      this.species,
      x => x.speciesIndex,
      (pop, species) => {
        pop.species = species;
        species.pops.push(pop);
      }
    );

    this.addSpeciesReference(
      this.species,
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

  private getCollection<T>(
    pairs: Pair[],
    createFunc: (id: string, pairs: Pair[]) => T,
    idFunc: (item: T) => string
  ): Collection<T> {
    const array: T[] = pairs
      .map(pair => {
        if (pair.key === null) {
          throw new Error();
        }

        if (typeof pair.value === "string") {
          if (pair.value === "none") {
            return null;
          } else {
            throw new Error("unrecognized value");
          }
        } else {
          return createFunc(pair.key, pair.value);
        }
      })
      .filter(x => x !== null)
      .map(x => {
        if (x === null) {
          throw new Error();
        }
        return x;
      });

    return new Collection(array, idFunc);
  }

  private addModelReference<T1, T2>(
    models: T1[],
    referenceGetter: (key: string) => T2,
    keyGetter: (model: T1) => string | undefined,
    setter: (model: T1, reference: T2) => void
  ) {
    models.forEach(model => {
      const key = keyGetter(model);
      if (typeof key !== "undefined") {
        const reference = referenceGetter(key);
        if (reference) {
          setter(model, reference);
        }
      }
    });
  }

  private addSpeciesReference<T>(
    models: T[],
    speciesArray: SpeciesImpl[],
    indexGetter: (model: T) => number | undefined,
    setter: (model: T, species: SpeciesImpl) => void
  ) {
    models.forEach(model => {
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

  private getPlayers(pairs: Pair[]): Collection<PlayerImpl> {
    return new Collection(
      asArray(pairs)
        .map(asPairArray)
        .map(item => new PlayerImpl(item)),
      player => player.name
    );
  }

  private getPlanets(pairs: Pair[]): Collection<PlanetImpl> {
    const array = asArray(pairs, "planet");
    if (array.length !== 1) {
      throw new Error("unexpected array length");
    }

    const planets = asPairArray(array[0]).map(pair => {
      if (pair.key === null) {
        throw new Error();
      }

      return new PlanetImpl(pair.key, asPairArray(pair.value));
    });

    return new Collection(planets, planet => planet.id);
  }

  private getSpecies(pairs: Pair[]) {
    return pairs.map(pair => new SpeciesImpl(asPairArray(pair.value)));
  }

  private linkSystemsByHyperlanes(pairs: Pair[]) {
    pairs.map(pair => {
      if (pair.key === null) {
        throw new Error();
      }

      const system = this.systems.get(pair.key);

      const systemData = asDictionary(asPairArray(pair.value));
      if (systemData["hyperlane"]) {
        system.hyperlanes = asArray(asPairArray(systemData["hyperlane"]))
          .map(item => asDictionary(asPairArray(item)))
          .map(
            data =>
              new Hyperlane(
                system,
                this.systems.get(asString(data["to"])),
                parseFloat(asString(data["length"]))
              )
          );
      } else {
        system.hyperlanes = [];
      }
    });
  }
}
