/**
 * @jest-environment node
 */
import compiler from "./compiler.js";

test("under defaults outputs the default export", async () => {
  const stats = await compiler("default-export-string.js");
  const {
    modules: [{ source }],
  } = stats.toJson({ source: true });
  const output = getOutput(source);
  expect(output).toEqual("default value");
});

test("under defaults, when module exports only a string, outputs the string", async () => {
  const stats = await compiler("exports-string.js");
  const {
    modules: [{ source }],
  } = stats.toJson({ source: true });
  const output = getOutput(source);
  expect(output).toEqual("hello world");
});

test("under defaults, when module exports only a non-string, throws", async () => {
  try {
    await compiler("exports-number.js");
  } catch (e) {
    return expect(
      findError("Default export must be a string, but found number.", e),
    ).toBeTruthy();
  }
});

test("under defaults, when default export is not a string and module doesn't export a string only, throws", async () => {
  try {
    await compiler("default-export-number.js");
  } catch (e) {
    return expect(
      findError("Default export must be a string, but found number.", e),
    ).toBeTruthy();
  }
});

test("under `export` option outputs a single export", async () => {
  const stats = await compiler("named-export-string.js", {
    export: "moduleId",
  });
  const {
    modules: [{ source }],
  } = stats.toJson({ source: true });
  const output = getOutput(source);
  expect(output).toEqual("example");
});

test("under `export` option throws when export is not a string", async () => {
  try {
    await compiler("named-export-number.js", { export: "moduleId" });
  } catch (e) {
    return expect(
      findError('Export "moduleId" must be a string, but found number.', e),
    ).toBeTruthy();
  }
  throw new Error("Did not throw as expected.");
});

test("under `module` option outputs the whole module in JSON format", async () => {
  const stats = await compiler("component.js", { module: true });
  const {
    modules: [{ source }],
  } = stats.toJson({ source: true });
  const output = getOutput(source);
  expect(JSON.parse(output)).toEqual({
    moduleId: "button",
    css: ".foo{}",
    obj: {
      obj: "[Circular]",
    },
  });
});

test("allows the `module` flag to be set by query string", async () => {
  const stats = await compiler(
    "component.js",
    { module: "" }, // e.g. { use: "execute-module-loader?module" }
  );
  const {
    modules: [{ source }],
  } = stats.toJson({ source: true });
  const output = getOutput(source);
  expect(JSON.parse(output)).toEqual({
    moduleId: "button",
    css: ".foo{}",
    obj: {
      obj: "[Circular]",
    },
  });
});

function getOutput(content) {
  if (!content.startsWith("export default ")) {
    throw new Error("Unexpected format. Check getOutput() test function.");
  }
  return JSON.parse(
    content.replace(/^export\sdefault\s/, "").replace(/;$/, ""),
  );
}

function findError(message, errors) {
  return errors.find(error => {
    return error?.message?.includes(message);
  });
}
