/**
 * DBFORGE TOOL : Webpack Config File
 * ======================================================================
 * Webpack configuration file.
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.com.br>
 * @since       3.0.0
 * @copyright   (c) 2017 Fabio Y. Goto
 */

// Require libraries
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Autoprefix = require("autoprefixer");
const Webpack = require("webpack");
const path = require("path");
const CopyWebpack = require("copy-webpack-plugin");

// Set Webpack Config
module.exports = {
    entry: [
        "./src/Main.js",
        "./source/scss/main.scss"
    ],
    output: {
        filename: "public/bundle.js"
    }, 
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015", "react"]
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                use: "file-loader?name=./fonts/[name].[ext]"
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(sass|scss)$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract([
                    "css-loader",
                    "resolve-url-loader",
                    "sass-loader?precision=8",
                    "postcss-loader"
                ])
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "public/bundle.css",
            allChunks: true
        }),
        new Webpack.LoaderOptionsPlugin({
            minimize: true,
            options: {
                postcss: [Autoprefix]
            }
        }),
        new CopyWebpack([
            {
                from: "./node_modules/font-awesome/fonts/*",
                to: "./public/fonts",
                flatten: true
            }
        ])
    ],
    resolve: {
        // Resolve path alias, so we don't have to put "../", etc.
        alias: {
            src: path.resolve(__dirname, "src"),
            Base: path.resolve(__dirname, "source/base"), 
            Page: path.resolve(__dirname, "source/page"),
            Helper: path.resolve(__dirname, "source/helper"),
            Routes: path.resolve(__dirname, "source/routes"),
            Components: path.resolve(__dirname, "source/components")
        }
    }
};
