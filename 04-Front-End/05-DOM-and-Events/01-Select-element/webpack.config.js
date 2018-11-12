const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./spec/select_examiner.js"),
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js"
  },
  devtool: "sourcemap"
};
