// node.js에 기본으로 깔려있는 모듈로 경로 지정을 위해 사용
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// mode : 모드에 따라 번들링 최적화를 진행(development, production)
// entry : 의존성 그래프 시작점, 번들링 시작점
// output : 번들링 결과물 경로 및 이름 지정
// target : 웹팩에서 번들링 결과를 어떤 목표로하는지 설정(web, webworker, es5, es2020, node)
// module : 웹팩에서 사용하는 모듈에 대한 설정(웹팩 로더 설정)
// devtool : 소스맵 생성 관련 설정(source-map, inline-source-map, eval-source-map 등)

module.exports = {
  // entry 포인트 지정
  entry: "./src/index.js",
  // bundle라는 폴더의 index.js라는 이름의 파일로 번들링하겠다.
  mode: "development",
  output: {
    path: path.resolve(__dirname, "bundle"),
    filename: "bundle.js",
  },
  module: {
    // 사용하는 loader를 써줍니다.
    // loader는 순서가 중요합니다. 위에서 아래로 써주세요.
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: "file-loader",
        exclude: /node_modules/,
        options: {
          name: "[name].[ext]?[hash]",
        },
      },
      {
        test: /\.css$/i,
        // use의 경우 오른쪽에서 왼쪽으로 읽습니다.
        // 즉, css-loader를 적용 후 style-loader 적용
        //use: [MiniCssExtractPlugin.loader, "style-loader", "css-loader"],
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  // plugin 설정
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/simple.html",
    }),
    new MiniCssExtractPlugin({
      filename: "common.css",
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, "bundle"),
    },
    port: 8000,
  },
  // chunk로 나눌때의 옵션
  // optimization: {
  //   splitChunks: {
  //     chunks: "async",
  //     minSize: 30000,
  //     maxSize: 0,
  //     minChunks: 1,
  //     maxAsyncRequests: 6,
  //     maxInitialRequests: 4,
  //     automaticNameDelimiter: "~",
  //     cacheGroups: {
  //       defaultVendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: -10,
  //       },
  //       default: {
  //         minChunks: 2,
  //         priority: -20,
  //         reuseExistingChunk: true,
  //       },
  //     },
  //   },
  // },
  // devtool: "cheap-eval-source-map",
};
