const { CheckerPlugin } = require('awesome-typescript-loader');
const { optimize } = require('webpack');
const { join } = require('path');
const Dotenv = require('dotenv-webpack');
let prodPlugins = [];

const basePath = join(__dirname, '../');

if (process.env.NODE_ENV === 'production') {
  prodPlugins.push(
    new optimize.AggressiveMergingPlugin(),
    new optimize.OccurrenceOrderPlugin()
  );
}

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: 'inline-source-map',
  entry: {
    background: join(basePath, 'src/background/background.ts'),
  },
  output: {
    path: join(basePath, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts?$/,
        use: 'awesome-typescript-loader?{configFileName: "tsconfig.json"}',
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: 'src/popup/.env',
    }),
    new CheckerPlugin(),
    ...prodPlugins,
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
};