import { compile } from "../compile";
import { Player } from "./player";
import { System } from "./system";
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

  constructor(doc: any) {
    this.version = this.getVersion(doc);
    this.name = doc["name"] as string;
    this.date = doc["date"] as string;
    this.requiredDlcs = doc["required_dlcs"] as string[];

    this.players = this.getPlayers(doc);
    this.countries = this.getCountries(doc);
    this.systems = this.getSystems(doc);

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

  private getVersion(doc: any): Version {
    return new Version(doc["version"] as string);
  }

  private getPlayers(doc: any) {
    const result: { [name: string]: Player } = {};

    (doc["player"] as any[]).map(d => {
      const player = new Player(d);
      result[player.name] = player;
    });

    return result;
  }

  private getCountries(doc: any): { [id: string]: Country } {
    const result: { [id: string]: Country } = {};

    const obj = doc["country"];
    const ids = Object.keys(obj);
    ids.map(id => {
      const country = new Country(id, obj[id]);
      result[country.id] = country;
    });

    return result;
  }

  private getSystems(doc: any): { [id: string]: System } {
    const result: { [id: string]: System } = {};

    const obj = doc["galactic_object"];
    const ids = Object.keys(obj);
    ids.map(id => {
      const system = new System(id, obj[id]);
      result[system.id] = system;
    });

    return result;
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
