const path = require("path");
const WebextensionPlugin = require("webpack-webextension-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",

  entry: {
    content: "./src/app/content.ts",
    background: "./src/app/background.ts",
    popup: "./src/popup/index.tsx"
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },

  plugins: [
    new WebextensionPlugin({
      vendor: "chrome"
    })
  ],

  output: {
    path: path.resolve(__dirname, "../dist/js"),
    filename: "[name].js"
  }
};
