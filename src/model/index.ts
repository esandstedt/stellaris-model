import { compile } from "../compile";

export class Model {

  static from(data: string | ArrayBuffer | Blob) {
    return compile(data).then(doc => new Model(doc));
  }

  constructor(doc: any) {
    console.log(Object.keys(doc));
  }

}