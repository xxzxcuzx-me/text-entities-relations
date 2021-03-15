/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");

module.exports = {
  entry: "./src/core.ts",
  mode: "development",
  devtool: "inline-source-map",
  optimization: {
    usedExports: true,
  },
  output: {
    library: "core",
    libraryTarget: "umd",

    filename: "core.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: "tsconfig.prod.json",
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new ESLintWebpackPlugin({ extensions: ["js", "ts"] }),
    new CleanWebpackPlugin(),
  ],
};
