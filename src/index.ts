import type {IApi} from "umi";
import fs from "fs";
import {winPath} from "@umijs/utils";
import {basename, dirname, join} from "path";
import _ from "lodash";
export default (api: IApi) => {
  api.describe({
    key: "tsconfigExtends",
    config: {
      schema(joi) {
        return joi.any();
      },
      onChange: api.ConfigChangeType.regenerateTmpFiles,
    },

    enableBy: api.EnableBy.config,
  });

  api.onGenerateFiles(async (args) => {
    // console.log("onGenerateFiles", args.isFirstTime, api.paths);
    const data = api.config.tsconfigExtends;

    const orginalTsConfigPath = join(api.paths.absTmpPath, "tsconfig.json");
    const tsconfigJson = (await readJsonFile(orginalTsConfigPath)) || {};
    // console.log("orginalTsconfigPath", tsconfigJson);
    if (data) {
      const result =
        typeof data === "function" ? data({...tsconfigJson}) : data;
      api.writeTmpFile({
        path: "tsconfig.json",
        noPluginDir: true,
        content: JSON.stringify(_.mergeWith(tsconfigJson, result), null, 2),
      });
    }
  });
};

function readJsonFile(filePath: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (e) {
          reject(e);
        }
      }
    });
  });
}
