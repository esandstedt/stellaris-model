import { Collection } from "./collection";

/**
 * Loads the savefile and extracts its information into a [[Model]].
 * @param path the savefile path
 */
export function load(path: string): Promise<Model> {
  throw new Error();
}

export interface Model {
  countries: Collection<Country>;
  date: string;
  factions: Collection<Faction>;
  fleets: Collection<Fleet>;
  leaders: Collection<Leader>;
  name: string;
  planets: Collection<Planet>;
  players: Collection<Player>;
  pops: Collection<Pop>;
  requiredDlcs: string[];
  ships: Collection<Ship>;
  species: Species[];
  starbases: Collection<Starbase>;
  systems: Collection<System>;
  version: string;
  wormholes: Collection<Wormhole>;
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface Country {
  id: string;
  controlledPlanets: Planet[];
  factions: Faction[];
  flag: Flag;
  fleets: Fleet[];
  fleetSize: number;
  leaders: Leader[];
  name: string;
  overlord: Country | undefined;
  ownedPlanets: Planet[];
  starbases: Starbase[];
  subjects: Country[];
}

export interface Faction {
  id: string;
  approval: number | undefined;
  country: Country;
  leader: Leader | undefined;
  name: string;
  pops: Pop[];
  support: number;
  type: string;
}

export interface Flag {
  background: {
    category: string;
    file: string;
  };
  colors: string[];
  icon: {
    category: string;
    file: string;
  };
}

export interface Fleet {
  id: string;
  isCivilian: boolean;
  isStation: boolean;
  militaryPower: number;
  name: string;
  owner: Country;
  ships: Ship[];
}

export interface Hyperlane {
  from: System;
  to: System;
  length: number;
}

export interface Leader {
  id: string;
  age: number;
  agenda: string;
  leaderClass: string;
  country: Country | undefined;
  gender: string | undefined;
  level: number;
  name: string;
  species: Species;
}

export interface Planet {
  id: string;
  amenities: number;
  amenitiesUsage: number;
  colonizeDate: string | undefined;
  controller: Country | undefined;
  coordinates: Coordinate;
  crime: number;
  owner: Country | undefined;
  name: string;
  planetClass: string;
  size: number;
  stability: number;
  system: System;
  pops: Pop[];
}

export interface Player {
  country: Country | undefined;
  name: string;
}

export interface Pop {
  id: string;
  amenitiesUsage: number;
  category: string;
  crime: number | undefined;
  ethos: string | undefined;
  faction: Faction | undefined;
  happiness: number | undefined;
  housingUsage: number;
  job: string | undefined;
  planet: Planet;
  power: number | undefined;
  species: Species;
}

export interface Ship {
  id: string;
  experience: number;
  fleet: Fleet;
  name: string;
}

export interface Species {
  adjective: string | undefined;
  base: Species | undefined;
  children: Species[];
  homePlanet: Planet | undefined;
  leaders: Leader[];
  name: string;
  plural: string | undefined;
  pops: Pop[];
  portrait: string;
  sapient: boolean;
  speciesClass: string;
  traits: string[];
}

export interface Starbase {
  id: string;
  buildings: string[];
  level: string;
  modules: string[];
  owner: Country;
  system: System;
}

export interface System {
  id: string;
  coordinate: Coordinate;
  hyperlanes: Hyperlane[];
  name: string;
  planets: Planet[];
  starbase: Starbase | undefined;
  starClass: string;
  type: string;
}

export interface Wormhole {
  id: string;
  link: Wormhole;
  system: System;
}
