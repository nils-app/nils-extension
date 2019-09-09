const path = require("path");
const WebextensionPlugin = require("webpack-webextension-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
const LiveReloadPlugin = require("webpack-weex-livereload-plugin");
const ZipPlugin = require("zip-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";
const OUTPUT_PATH = "dist";
const target = process.env.TARGET || "firefox";

// Prepare the manifest
const manifestTemplate = JSON.parse(fs.readFileSync(`../manifest.json`));
const manifestOptions = {
  firefox: {
    applications: {
      gecko: {
        id: "my-app-id@mozilla.org"
      }
    }
  }
};
const manifest = Object.assign(
  {},
  manifestTemplate,
  target === "firefox" ? manifestOptions.firefox : {}
);

const webackConfig = {
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
    path: path.resolve(__dirname, `../${OUTPUT_PATH}/${target}`),
    filename: "[name].js"
  }
};

if (isProduction) {
  webpackConfig.output.path = resolve(`${OUTPUT_PATH}/${target}`);
  webpackConfig.plugins = webpackConfig.plugins.concat([
    new UglifyJsPlugin({
      uglifyOptions: {
        mangle: false,
        output: { ascii_only: true }
      }
    }),
    new ZipPlugin({ filename: `${target}.zip` })
  ]);
  webpackConfig.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            comparisons: false
          },
          parse: {},
          mangle: true,
          output: {
            comments: false,
            ascii_only: true
          }
        },
        parallel: true,
        cache: true,
        sourceMap: true
      })
    ],
    nodeEnv: "production",
    sideEffects: true,
    concatenateModules: true,
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        },
        main: {
          chunks: "all",
          minChunks: 2,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    },
    runtimeChunk: true
  };
} else {
  webpackConfig.entry.background = [
    "./src/scripts/livereload.ts",
    "./src/scripts/background.ts"
  ];
  webpackConfig.plugins = webpackConfig.plugins.concat([
    new WriteFilePlugin(),
    new LiveReloadPlugin({ port: 35729, message: "reload" })
  ]);
}

module.exports = webackConfig;
