import { ModelImpl, Model } from "./model";
import { compile } from "./compile";

export { Model } from "./model";

export function from(data: string | ArrayBuffer | Blob): Promise<Model> {
  return compile(data).then(doc => new ModelImpl(doc));
}
