const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerWebpackPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");
const json5 = require("json5");

module.exports = {
  // https://webpack.js.org/concepts/entry-points/
  entry: {
    main: {
      import: "./src/main.js",
      filename: "touchpad-scroll-carousel.min.js",
    },
    index: {
      import: "./src/index.js",
      filename: "index.[contenthash].js",
      dependOn: "main",
    },
  },

  // https://webpack.js.org/concepts/output/
  output: {
    path: `${__dirname}/dist`,
    publicPath: "/",
    clean: true,
  },

  // https://webpack.js.org/concepts/plugins/
  plugins: [
    // https://webpack.js.org/plugins/html-webpack-plugin/
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body",
      chunks: ["main", "index"],
      filename: "index.html",
    }),

    // https://webpack.js.org/plugins/mini-css-extract-plugin/
    new MiniCssExtractPlugin({
      filename: "[name].min.css",
    }),

    // https://webpack.js.org/plugins/image-minimizer-webpack-plugin/
    new ImageMinimizerWebpackPlugin({
      minimizerOptions: {
        // Lossless optimization with custom option
        plugins: [
          ["gifsicle", { interlaced: true }],
          ["jpegtran", { progressive: true }],
          ["optipng", { optimizationLevel: 5 }],
          // Svgo configuration here https://github.com/svg/svgo#configuration
          [
            "svgo",
            {
              plugins: extendDefaultPlugins([
                {
                  name: "removeViewBox",
                  active: false,
                },
                {
                  name: "addAttributesToSVGElement",
                  params: {
                    attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                  },
                },
              ]),
            },
          ],
        ],
      },
    }),

    // https://webpack.js.org/plugins/banner-plugin/#root
    new webpack.BannerPlugin({
      banner: "Scroll Carousel v1.0.2 | (c) 2022 Robin Huy | MIT license.\n",
    }),
  ],

  // https://webpack.js.org/concepts/modules/
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "img/[hash][ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        generator: {
          filename: "fonts/[name][ext]",
        },
        use: {
          loader: "url-loader", // Use url-loader when change generator filename
        },
      },
      {
        test: /\.json5$/i,
        type: "json",
        parser: {
          parse: json5.parse,
        },
      },
    ],
  },
};
