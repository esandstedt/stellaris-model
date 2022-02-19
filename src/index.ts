import { compile } from "./compile";
import { ModelImpl } from "./model";
import { Model } from "./model/interfaces";

export * from "./model/interfaces";
export { Collection } from "./model/collection";

/**
 * Loads the savefile and extracts its information into a [[Model]].
 * @param data the savefile data
 */
export async function load(data: string | Buffer): Promise<Model> {
  const pairs = await compile(data);
  return new ModelImpl(pairs);
}
