import { Coordinate } from "./coordinate";

export class System {
  coordinate: Coordinate;
  type: string;
  name: string;

  planetIds: string[];

  constructor(public id: string, doc: any) {
    this.coordinate = new Coordinate(doc["coordinate"]);
    this.type = doc["type"] as string;
    this.name = doc["name"] as string;
    this.planetIds = doc["planets"] as string[];
  }
}
