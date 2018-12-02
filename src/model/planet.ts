import { Coordinate } from "./coordinate";

export class Planet {

  name: string
  coordinates: Coordinate
  size: number

  constructor(public id: string, doc: any) {
    this.name = doc["name"] as string;
    this.coordinates = new Coordinate(doc["coordinate"]);
    this.size = parseInt(doc["planet_size"]);
  }
}