# execute-module-loader <a href="https://github.com/nsaunders/execute-module-loader/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/nsaunders/execute-module-loader/ci.yml?branch=master" alt="Build status"></a> <a href="https://www.npmjs.com/package/execute-module-loader"><img src="https://img.shields.io/npm/v/execute-module-loader.svg" alt="Latest Release"></a> <a href="https://github.com/nsaunders/execute-module-loader/blob/master/LICENSE"><img src="https://img.shields.io/github/license/nsaunders/execute-module-loader.svg" alt="License"></a>

This is a Webpack loader that allows you to execute a module at build time. It
was originally taken from
[a Webpack test case](https://github.com/webpack/webpack/tree/main/test/configCases/loader-import-module/css)
and is distributed as a NPM module for convenience.

## Default behavior

Given an ES module, the `export default` value will be used. For CommonJS modules, the `module.exports` value will be used.

> **Warning**
> The value must be a string, or else compilation will fail.

## Options

**export**: string

An export whose value to return as the module output. The value must be a string.

**module**: boolean

When enabled, all exports will be included in the module output, encoded in a stringified JSON object.
