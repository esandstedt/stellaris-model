import fs from "fs";

import { load, Model } from ".";

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

(async () => {
  const model = await loadPath("savefiles/ironman.sav");
})();
