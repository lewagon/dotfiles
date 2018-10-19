const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./lib/listener.js"),
  output: {
    filename: "build/application.js"
  },
  devtool: "sourcemap"
};
