export class Coordinate {

  x: number
  y: number

  constructor(doc: any) {
    this.x = parseFloat(doc["x"]);
    this.y = parseFloat(doc["y"]);
  }
}