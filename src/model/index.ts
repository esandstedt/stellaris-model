import { compile } from "../compile";
import { Player } from "./player";
import { System } from "./system";
import { Planet } from "./planet";

export class Model {

  static from(data: string | ArrayBuffer | Blob) {
    return compile(data).then(doc => new Model(doc));
  }

  version: string
  name: string
  date: string
  requiredDlcs: string[]
  players: { [name: string]: Player }
  systems: { [id: string]: System }
  planets: { [id: string]: Planet }

  constructor(doc: any) {
    this.version = doc["version"] as string;
    this.name = doc["name"] as string;
    this.date = doc["date"] as string;
    this.requiredDlcs = doc["required_dlcs"] as string[];

    this.players = {};
    for (let d in doc["player"]) {
      const player = new Player(d);
      this.players[player.name] = player;
    }

    this.systems = {};
    for (let key in doc["galactic_object"]) {
      let value = doc["galactic_object"][key];
      this.systems[key] = new System(key, value);
    }

    this.planets = {};
    for (let key in doc["planet"]) {
      let value = doc["planet"][key];
      this.planets[key] = new Planet(key, value);
    }

  }

  // Still todo:
  //  - connect Player to Country
  //  - connect System to Planet

}