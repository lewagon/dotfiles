const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./lib/app.js"),
  output: {
    filename: "build/application.js"
  },
  devtool: "sourcemap"
};
