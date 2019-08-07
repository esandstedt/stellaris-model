import { Collection } from "./collection";

/**
 * Loads the savefile and extracts its information into a [[Model]].
 * @param path the savefile path
 */
export function load(path: string): Promise<Model> {
  throw new Error();
}

export interface Model {
  armies: Collection<Army>;
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
  sectors: Collection<Sector>;
  ships: Collection<Ship>;
  shipDesigns: Collection<ShipDesign>;
  species: Species[];
  starbases: Collection<Starbase>;
  systems: Collection<System>;
  version: string;
  wormholes: Collection<Wormhole>;
}

export interface Army {
  id: string;
  experience: number;
  health: number;
  home: Planet | undefined;
  leader: Leader | undefined;
  maxHealth: number;
  morale: number;
  owner: Country;
  name: string;
  planet: Planet | undefined;
  pop: Pop | undefined;
  ship: Ship | undefined;
  species: Species | undefined;
  type: string;
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface Country {
  id: string;
  armies: Army[];
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
  owner: Country | undefined;
  ships: Ship[];
  system: System;
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
  army: Army | undefined;
  country: Country | undefined;
  date: string;
  experience: number;
  gender: string | undefined;
  immortal: boolean;
  level: number;
  name: string;
  portrait: string;
  sector: Sector | undefined;
  species: Species;
  type: LeaderType;
}

export enum LeaderType {
  Admiral,
  General,
  Governor,
  Scientist,
  Ruler
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

export interface Sector {
  id: string;
  capital: Planet;
  governor: Leader | undefined;
  name: string;
  owner: Country | undefined;
  type: SectorType;
}

export enum SectorType {
  Core,
  Normal
}

export interface Ship {
  id: string;
  army: Army | undefined;
  design: ShipDesign;
  experience: number;
  fleet: Fleet;
  leader: Leader | undefined;
  name: string;
}

export interface ShipDesign {
  id: string;
  ships: Ship[];
  type: string;
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
