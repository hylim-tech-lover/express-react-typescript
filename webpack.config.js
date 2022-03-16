const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const outputDirectory = "dist";

module.exports = {
  entry: ["babel-polyfill", "./src/client/index.tsx"],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "./js/[name].bundle.js",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },
      {
        enforce: "pre",
        test: /\.js$/,
        use: [{ loader: "source-map-loader" }],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [{ loader: "url-loader?limit=100000" }],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".ts", ".tsx", ".js", ".jsx", ".json"],
    plugins: [new TsconfigPathsPlugin()],
  },
  devServer: {
    port: 8000,
    open: true,
    hot: true,
    proxy: {
      "/": "http://localhost:3000",
    },
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: [outputDirectory],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
      title: "express-typescript-react",
    }),
    new MiniCssExtractPlugin({
      filename: "./css/[name].css",
      chunkFilename: "./css/[id].css",
    }),
    new CopyPlugin({
      patterns: [
        { from: "./src/client/Assets", to: "assets", noErrorOnMissing: true },
      ],
    }),
  ],
};
