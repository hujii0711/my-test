//const path = require("path");
//const HtmlWebpackPlugin = require("html-webpack-plugin");
//const { CleanWebpackPlugin } = require("clean-webpack-plugin");
//const MiniCssExtractPlugin = require("mini-css-extract-plugin");
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log("__dirname===========", __dirname);

export default {
  entry: "./src/index.ts", // 번들링 시작 위치
  output: {
    path: path.join(__dirname, "/build"), // 번들 결과물 위치
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /[\.js]$/, // .js 에 한하여 babel-loader를 이용하여 transpiling
        exclude: /node_module/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.ts$/, // .ts 에 한하여 ts-loader를 이용하여 transpiling
        exclude: /node_module/,
        use: {
          loader: "ts-loader",
        },
      },
      //{
      //  test: /\.(png|jpe?g|gif)$/i,
      //  use: "file-loader",
      //  exclude: /node_modules/,
      //  options: {
      //    name: "[name].[ext]?[hash]",
      //  },
      //},
      //{
      //  test: /\.css$/i,
      //  use: [MiniCssExtractPlugin.loader, "css-loader", "style-loader"],
      //  exclude: /node_modules/,
      //},
    ],
  },
  resolve: {
    modules: [path.join(__dirname, "src"), "node_modules"], // 모듈 위치
    extensions: [".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // 템플릿 위치
    }),
    //new MiniCssExtractPlugin({
    //  filename: "common.css",
    //}),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    host: "localhost", // live-server host 및 port
    port: 5000,
  },
  mode: "development", // 번들링 모드 development / production
};
