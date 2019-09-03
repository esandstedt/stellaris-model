import fs from "fs";

import { Model, load } from "..";

export function loadPath(path: string): Promise<Model> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, async (error, file) => {
      if (error) {
        reject(error);
      }

      const model = await load(file);

      resolve(model);
    });
  });
}
