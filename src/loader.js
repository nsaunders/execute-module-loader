// Adapted from https://github.com/webpack/webpack/blob/main/test/configCases/loader-import-module/css/loader.js
// Original author Tobias Koppers @sokra

import stringify from "safe-json-stringify";

export async function pitch(remaining) {
  const options = this.getOptions({
    title: "Execute Module Loader",
    type: "object",
    properties: {
      export: {
        type: "string",
      },
      module: {
        oneOf: [{ type: "boolean" }, { const: "" }],
      },
    },
  });

  const _module = await this.importModule(
    this.resourcePath + ".webpack[javascript/auto]" + "!=!" + remaining,
    this.getOptions(),
  );

  if (options.module || options.module === "") {
    return stringify(_module);
  }

  const exportName = options.export || "default";
  const result =
    _module[exportName] || (exportName === "default" ? _module : undefined);

  if (typeof result !== "string") {
    const prefix =
      exportName === "default" ? "Default export" : `Export "${exportName}"`;
    throw new Error(`${prefix} must be a string, but found ${typeof result}.`);
  }

  return result;
}
