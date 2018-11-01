const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./lib/wagon_race.js"),
  output: {
    filename: "build/application.js"
  },
  devtool: "sourcemap"
};
