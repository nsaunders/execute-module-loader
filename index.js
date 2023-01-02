// Adapted from https://github.com/webpack/webpack/blob/main/test/configCases/loader-import-module/css/loader.js
// Original author Tobias Koppers @sokra

exports.pitch = async function (remaining) {
	const { getResult = result => result.default || result } = this.getOptions();
	if (typeof getResult !== "function") {
		throw new Error("The `getResult` option must be a function.");
	}
	return getResult(await this.importModule(
		this.resourcePath + ".webpack[javascript/auto]" + "!=!" + remaining,
		this.getOptions(),
	));
};
