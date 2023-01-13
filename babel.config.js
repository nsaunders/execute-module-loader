module.exports = {
  ignore: [/node_modules/],
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "10.13.0",
        },
      },
    ],
  ],
};