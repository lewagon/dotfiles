const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./spec/examiner.js"),
  output: {
    filename: "build/application.js"
  },
  devtool: "sourcemap"
};
