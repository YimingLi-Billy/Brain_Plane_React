const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var plugins = [new MiniCssExtractPlugin({ filename: "index.css" })];

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');
const mode = "development";


module.exports = {
  entry: [
    "core-js/stable",
    "regenerator-runtime/runtime",
    `${SRC_DIR}/index.jsx`
  ],
  output: {
    path: DIST_DIR,
    filename: 'bundle.js',
  },
  devtool: mode === "development" ? "eval-source-map" : "source-map",
  mode: mode,
  watch: mode === "development" ? true : false,
  watchOptions: {
    aggregateTimeout: 500,
    poll: 500,
  },
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env", "@babel/preset-react"] },
        },
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader, {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[path][name]__[local]"
              }
            }
          }, {
            loader: 'resolve-url-loader',
          }, 'sass-loader'
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ["file-loader"]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `./client/src/index.html`,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }), ...plugins
  ],
};
