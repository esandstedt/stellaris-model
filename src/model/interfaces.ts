import { Collection } from "./collection";

/**
 * Loads the savefile and extracts its information into a [[Model]].
 * @param data the savefile data
 */
export function load(data: string | Buffer): Promise<Model> {
  throw new Error();
}

export interface Model {
  alliances: Collection<Alliance>;
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
  wars: Collection<War>;
  wormholes: Collection<Wormhole>;
}

export interface Alliance {
  id: string;
  associates: Country[];
  leader: Country;
  members: Country[];
  name: string;
}

export interface Army {
  id: string;
  experience: number;
  health: number;
  home: Planet | undefined;
  leader: Leader | undefined;
  maxHealth: number;
  morale: number | undefined;
  owner: Country;
  name: string;
  planet: Planet | undefined;
  pop: Pop | undefined;
  ship: Ship | undefined;
  species: Species | undefined;
  type: string;
}

export interface Budget {
  energy: BudgetResource;
  minerals: BudgetResource;
  food: BudgetResource;
  consumerGoods: BudgetResource;
  alloys: BudgetResource;
  influence: BudgetResource;
  unity: BudgetResource;
  research: {
    physics: BudgetResource;
    society: BudgetResource;
    engineering: BudgetResource;
    total: number;
  };
  strategic: {
    volatileMotes: BudgetResource;
    exoticGases: BudgetResource;
    rareCrystals: BudgetResource;
    livingMetal: BudgetResource;
    zro: BudgetResource;
    darkMatter: BudgetResource;
    nanites: BudgetResource;
  };
}

export interface BudgetResource {
  items: BudgetItem[];
  total: number;
}

export interface BudgetItem {
  type: string;
  amount: number;
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface Country {
  id: string;
  activePolicies: Policy[];
  adjective: string;
  alliance: Alliance | undefined;
  armies: Army[];
  ascensionPerks: string[];
  associatedAlliance: Alliance | undefined;
  budget: Budget;
  capital: Planet | undefined;
  controlledPlanets: Planet[];
  cityGraphicalCulture: string | undefined;
  customName: boolean;
  economyPower: number;
  edicts: Edict[];
  emigration: number;
  empireCohesion: number;
  empireSize: number;
  ethos: Ethic[];
  factions: Faction[];
  flag: Flag;
  fleets: Fleet[];
  fleetSize: number;
  government: Government | undefined;
  heir: Leader | undefined;
  immigration: number;
  leaders: Leader[];
  militaryPower: number;
  name: string;
  overlord: Country | undefined;
  ownedPlanets: Planet[];
  ruler: Leader | undefined;
  starbases: Starbase[];
  starbaseCapacity: number;
  subjects: Country[];
  subjectDate: string | undefined;
  subjectType: string | undefined;
  traditions: string[];
  type: string;
  victoryScore: number;
  wars: War[];
}

export interface Edict {
  name: string;
  date: string;
}

export enum Ethic {
  GestaltConsciousness,
  Authoritarian,
  FanaticAuthoritarian,
  Egalitarian,
  FanaticEgalitarian,
  Materialist,
  FanaticMaterialist,
  Militarist,
  FanaticMilitarist,
  Pacifist,
  FanaticPacifist,
  Spiritualist,
  FanaticSpiritualist,
  Xenophile,
  FanaticXenophile,
  Xenophobe,
  FanaticXenophobe
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

export interface Government {
  authority: string;
  civics: string[];
  type: string;
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
  armies: Army[];
  buildings: string[];
  colonizeDate: string | undefined;
  controller: Country | undefined;
  coordinates: Coordinate;
  crime: number;
  districts: string[];
  migration: number;
  name: string;
  owner: Country | undefined;
  planetClass: string;
  pops: Pop[];
  size: number;
  stability: number;
  system: System;
  totalHousing: number;
}

export interface Player {
  country: Country | undefined;
  name: string;
}

export interface Policy {
  name: string;
  selected: string;
}

export interface Pop {
  id: string;
  amenitiesUsage: number;
  canMigrate: boolean;
  category: string;
  crime: number | undefined;
  ethos: string | undefined;
  faction: Faction | undefined;
  happiness: number | undefined;
  housingUsage: number;
  job: string | undefined;
  planet: Planet;
  power: number | undefined;
  promotionDate: string | undefined;
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

export interface War {
  id: string;
  attackers: WarParticipant[];
  attackerWarExhaustion: number;
  attackerWarGoals: string[];
  battles: WarBattle[];
  defenders: WarParticipant[];
  defenderWarExhaustion: number;
  defenderWarGoals: string[];
  name: string;
  startDate: string;
}

export interface WarBattle {
  attackers: Country[];
  attackerLosses: number;
  attackerWarExhaustion: number;
  date: string;
  defenders: Country[];
  defenderLosses: number;
  defenderWarExhaustion: number;
  planet: Planet | undefined;
  system: System | undefined;
  type: "armies" | "ships";
  victor: "attacker" | "defender";
}

export interface WarParticipant {
  callType: string;
  country: Country;
  caller: Country | undefined;
}

export interface Wormhole {
  id: string;
  link: Wormhole;
  system: System;
}
