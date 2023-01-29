const path = require("path");
const slsw = require("serverless-webpack");

module.exports = {
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  entry: "slsw.lib.entries",
  devtool: "source-map",
  resolve: {
    extensions: [".mjs", ".json", ".ts", "js"],
  },
  output: {
    libraryTarget: "commonjs2",
    path: path.resolve(__dirname, ".webpack"),
    filename: "[name].js",
  },
  target: "node",
  stats: "normal",
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: ["ts-loader"],
        exclude: /node_modules/,
      },
    ],
  },
};
