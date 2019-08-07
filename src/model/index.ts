import { asDictionary, asArray, asString, Pair, asPairArray } from "../compile";
import { Collection } from "./collection";
import { CountryImpl } from "./country";
import { FactionImpl } from "./faction";
import { Model } from "./interfaces";
import { LeaderImpl } from "./leader";
import { SystemImpl } from "./system";
import { HyperlaneImpl } from "./system/hyperlane";
import { PlanetImpl } from "./planet";
import { PlayerImpl } from "./player";
import { PopImpl } from "./pop";
import { SpeciesImpl } from "./species";
import { StarbaseImpl } from "./starbase";
import { WormholeImpl } from "./wormhole";
import { FleetImpl } from "./fleet";
import { ShipImpl } from "./ship";
import { ArmyImpl } from "./army";
import { ShipDesignImpl } from "./ship-design";
import { SectorImpl } from "./sector";
import { AllianceImpl } from "./alliance";

export class ModelImpl implements Model {
  public alliances: Collection<AllianceImpl>;
  public armies: Collection<ArmyImpl>;
  public countries: Collection<CountryImpl>;
  public date: string;
  public factions: Collection<FactionImpl>;
  public fleets: Collection<FleetImpl>;
  public leaders: Collection<LeaderImpl>;
  public name: string;
  public planets: Collection<PlanetImpl>;
  public players: Collection<PlayerImpl>;
  public pops: Collection<PopImpl>;
  public requiredDlcs: string[];
  public sectors: Collection<SectorImpl>;
  public ships: Collection<ShipImpl>;
  public shipDesigns: Collection<ShipDesignImpl>;
  public species: SpeciesImpl[];
  public starbases: Collection<StarbaseImpl>;
  public systems: Collection<SystemImpl>;
  public version: string;
  public wormholes: Collection<WormholeImpl>;

  constructor(pairs: Pair[]) {
    const data = asDictionary(pairs);

    this.version = asString(data["version"]);
    this.name = asString(data["name"]);
    this.date = asString(data["date"]);

    this.requiredDlcs = asArray(data["required_dlcs"]).map(asString);

    const systemPairs = asPairArray(data["galactic_object"]);

    this.alliances = this.getCollection(
      data["alliance"],
      (id, p) => new AllianceImpl(id, p),
      alliance => alliance.id
    );

    this.armies = this.getCollection(
      data["army"],
      (id, p) => new ArmyImpl(id, p),
      army => army.id
    );

    this.countries = this.getCollection(
      data["country"],
      (id, p) => new CountryImpl(id, p),
      country => country.id
    );

    if (typeof data["pop_factions"] !== "undefined") {
      this.factions = this.getCollection(
        data["pop_factions"],
        (id, p) => new FactionImpl(id, p),
        faction => faction.id
      );
    } else {
      this.factions = new Collection<FactionImpl>([], faction => faction.id);
    }

    this.fleets = this.getCollection(
      data["fleet"],
      (id, p) => new FleetImpl(id, p),
      fleet => fleet.id
    );

    this.leaders = this.getCollection(
      data["leaders"],
      (id, p) => new LeaderImpl(id, p),
      leader => leader.id
    );

    this.planets = this.getCollection(
      asDictionary(data["planets"])["planet"],
      (id, p) => new PlanetImpl(id, p),
      planet => planet.id
    );

    this.players = new Collection(
      asArray(data["player"])
        .map(asPairArray)
        .map(p => new PlayerImpl(p)),
      player => player.name
    );

    this.pops = this.getCollection(
      data["pop"],
      (id, p) => new PopImpl(id, p),
      pop => pop.id
    );

    this.sectors = this.getCollection(
      data["sectors"],
      (id, p) => new SectorImpl(id, p),
      sector => sector.id
    );

    this.ships = this.getCollection(
      data["ships"],
      (id, p) => new ShipImpl(id, p),
      ship => ship.id
    );

    this.shipDesigns = this.getCollection(
      data["ship_design"],
      (id, p) => new ShipDesignImpl(id, p),
      design => design.id
    );

    this.species = asPairArray(data["species"]).map(
      pair => new SpeciesImpl(asPairArray(pair.value))
    );

    this.starbases = this.getCollection(
      data["starbases"],
      (id, p) => new StarbaseImpl(id, p),
      base => base.id
    );

    this.systems = this.getCollection(
      systemPairs,
      (id, p) => new SystemImpl(id, p),
      system => system.id
    );

    const bypasses = asDictionary(data["bypasses"]);

    this.wormholes = this.getCollection(
      data["natural_wormholes"],
      (_, p) => {
        return new WormholeImpl(p, bypasses);
      },
      wormhole => wormhole.id
    );

    this.linkSystemsByHyperlanes(systemPairs);

    this.link(
      this.players,
      this.countries,
      player => player.countryId,
      (player, country) => (player.country = country)
    );

    this.link(
      this.planets,
      this.countries,
      planet => planet.controllerId,
      (planet, country) => {
        planet.controller = country;
        country.controlledPlanets.push(planet);
      }
    );

    this.link(
      this.planets,
      this.countries,
      planet => planet.ownerId,
      (planet, country) => {
        planet.owner = country;
        country.ownedPlanets.push(planet);
      }
    );

    this.link(
      this.planets,
      this.systems,
      planet => planet.systemId,
      (planet, system) => {
        planet.system = system;
        system.planets.push(planet);
      }
    );

    this.link(
      this.pops,
      this.factions,
      pop => pop.factionId,
      (pop, faction) => {
        pop.faction = faction;
        faction.pops.push(pop);
      }
    );

    this.link(
      this.pops,
      this.planets,
      pop => pop.planetId,
      (pop, planet) => {
        pop.planet = planet;
        planet.pops.push(pop);
      }
    );

    this.link(
      this.factions,
      this.countries,
      faction => faction.countryId,
      (faction, country) => {
        faction.country = country;
        country.factions.push(faction);
      }
    );

    this.link(
      this.factions,
      this.leaders,
      faction => faction.leaderId,
      (faction, leader) => {
        faction.leader = leader;
      }
    );

    this.link(
      this.leaders,
      this.countries,
      leader => leader.countryId,
      (leader, country) => {
        leader.country = country;
        country.leaders.push(leader);
      }
    );

    this.link(
      this.species,
      this.planets,
      species => species.homePlanetId,
      (species, planet) => {
        species.homePlanet = planet;
      }
    );

    this.linkSpecies(
      this.leaders,
      this.species,
      x => x.speciesIndex,
      (leader, species) => {
        leader.species = species;
        species.leaders.push(leader);
      }
    );

    this.linkSpecies(
      this.pops,
      this.species,
      x => x.speciesIndex,
      (pop, species) => {
        pop.species = species;
        species.pops.push(pop);
      }
    );

    this.linkSpecies(
      this.species,
      this.species,
      x => x.baseIndex,
      (species, base) => {
        species.base = base;
        base.children.push(species);
      }
    );

    this.link(
      this.wormholes,
      this.wormholes,
      x => x.linkId,
      (wormhole, link) => (wormhole.link = link)
    );

    this.link(
      this.wormholes,
      this.systems,
      x => x.systemId,
      (wormhole, system) => (wormhole.system = system)
    );

    this.link(
      this.starbases,
      this.systems,
      x => x.systemId,
      (starbase, system) => {
        starbase.system = system;
      }
    );

    this.link(
      this.starbases,
      this.countries,
      x => x.ownerId,
      (starbase, country) => {
        starbase.owner = country;
        country.starbases.push(starbase);
      }
    );

    this.link(
      this.systems,
      this.starbases,
      x => x.starbaseId,
      (system, starbase) => {
        system.starbase = starbase;
      }
    );

    this.link(
      this.countries,
      this.countries,
      x => x.overlordId,
      (country, overlord) => {
        country.overlord = overlord;
        overlord.subjects.push(country);
      }
    );

    this.link(
      this.fleets,
      this.countries,
      x => x.ownerId,
      (fleet, owner) => {
        fleet.owner = owner;
        owner.fleets.push(fleet);
      }
    );

    this.link(
      this.ships,
      this.fleets,
      x => x.fleetId,
      (ship, fleet) => {
        ship.fleet = fleet;
        fleet.ships.push(ship);
      }
    );

    this.link(
      this.fleets,
      this.systems,
      x => x.systemId,
      (fleet, system) => {
        fleet.system = system;
      }
    );

    this.link(
      this.leaders,
      this.ships,
      x => x.shipId,
      (leader, ship) => {
        leader.ship = ship;
        ship.leader = leader;
      }
    );

    this.link(
      this.armies,
      this.countries,
      x => x.ownerId,
      (army, owner) => {
        army.owner = owner;
        owner.armies.push(army);
      }
    );

    this.link(
      this.armies,
      this.ships,
      x => x.shipId,
      (army, ship) => {
        army.ship = ship;
        ship.army = army;
      }
    );

    this.link(
      this.armies,
      this.planets,
      x => x.homeId,
      (army, home) => {
        army.home = home;
      }
    );

    this.link(
      this.armies,
      this.leaders,
      x => x.leaderId,
      (army, leader) => {
        army.leader = leader;
        leader.army = army;
      }
    );

    this.link(
      this.armies,
      this.planets,
      x => x.planetId,
      (army, planet) => {
        army.planet = planet;
      }
    );

    this.link(
      this.armies,
      this.pops,
      x => x.popId,
      (army, pop) => {
        army.pop = pop;
      }
    );

    this.linkSpecies(
      this.armies,
      this.species,
      x => x.speciesIndex,
      (army, species) => {
        army.species = species;
      }
    );

    this.link(
      this.ships,
      this.shipDesigns,
      x => x.designId,
      (ship, design) => {
        ship.design = design;
        design.ships.push(ship);
      }
    );

    this.link(
      this.sectors,
      this.leaders,
      x => x.governorId,
      (sector, governor) => {
        sector.governor = governor;
        governor.sector = sector;
      }
    );

    this.link(
      this.sectors,
      this.countries,
      x => x.ownerId,
      (sector, owner) => {
        sector.owner = owner;
        owner.sectors.push(sector);
      }
    );

    this.link(
      this.systems,
      this.sectors,
      x => x.sectorId,
      (system, sector) => {
        system.sector = sector;
        sector.systems.push(system);
      }
    );

    this.link(
      this.sectors,
      this.planets,
      x => x.capitalId,
      (sector, capital) => {
        sector.capital = capital;
      }
    );

    this.link(
      this.countries,
      this.planets,
      x => x.capitalId,
      (country, capital) => {
        country.capital = capital;
      }
    );

    this.link(
      this.alliances,
      this.countries,
      x => x.leaderId,
      (alliance, leader) => {
        alliance.leader = leader;
      }
    );

    this.link(
      this.countries,
      this.alliances,
      x => x.allianceId,
      (country, alliance) => {
        country.alliance = alliance;
        alliance.members.push(country);
      }
    );
  }

  private getCollection<T>(
    input: Pair[] | string,
    createFunc: (id: string, pairs: Pair[]) => T,
    idFunc: (item: T) => string
  ): Collection<T> {
    const array: T[] = asPairArray(input)
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

  private link<T1, T2>(
    models: Collection<T1> | T1[],
    referenceCollection: Collection<T2>,
    keyGetter: (model: T1) => string | undefined,
    setter: (model: T1, reference: T2) => void
  ) {
    if (models instanceof Collection) {
      models = models.getAll();
    }

    models.forEach(model => {
      const key = keyGetter(model);
      if (typeof key !== "undefined") {
        const reference = referenceCollection.get(key);
        if (reference) {
          setter(model, reference);
        }
      }
    });
  }

  private linkSpecies<T>(
    models: Collection<T> | T[],
    speciesArray: SpeciesImpl[],
    indexGetter: (model: T) => number | undefined,
    setter: (model: T, species: SpeciesImpl) => void
  ) {
    if (models instanceof Collection) {
      models = models.getAll();
    }

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

  private linkSystemsByHyperlanes(pairs: Pair[]) {
    pairs.map(pair => {
      if (pair.key === null) {
        throw new Error();
      }

      const system = this.systems.get(pair.key);

      if (typeof system === "undefined") {
        throw new Error();
      }

      const systemData = asDictionary(pair.value);
      if (systemData["hyperlane"]) {
        system.hyperlanes = asArray(systemData["hyperlane"])
          .map(item => asDictionary(item))
          .map(data => {
            const to = this.systems.get(asString(data["to"]));

            if (typeof to === "undefined") {
              throw new Error();
            }

            return new HyperlaneImpl(
              system,
              to,
              parseFloat(asString(data["length"]))
            );
          });
      } else {
        system.hyperlanes = [];
      }
    });
  }
}
