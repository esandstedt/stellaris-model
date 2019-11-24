import { Hyperlane, System } from "../interfaces";

export class HyperlaneImpl implements Hyperlane {
  constructor(public from: System, public to: System, public length: number) {}
}
