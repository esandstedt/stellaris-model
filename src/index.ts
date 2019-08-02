import { compile } from "./compile";
import { ModelImpl } from "./model";
import { Model } from "./model/interfaces";

export * from "./model/interfaces";
export { Collection } from "./model/collection";

/**
 * Loads the savefile and extracts its information into a [[Model]].
 * @param path the savefile path
 */
export async function load(path: string): Promise<Model> {
  return new ModelImpl(await compile(path));
}
