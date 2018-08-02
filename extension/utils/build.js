var webpack = require("webpack"),
    config = require("../webpack.config");

delete config.chromeExtensionBoilerplate;

console.log(config.mode);
console.log(config.devtool);

webpack(
  config,
  function (err) { if (err) throw err; }
);
