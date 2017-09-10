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
path = require("path");

// Set Webpack Config
module.exports = {
    entry: "./source/Main.js",
    output: {
        filename: "public/bundle.js"
    }, 
    module: {
        loaders: [
            {
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader", 
                query: {
                    presets: ["es2015", "react"]
                }
            }
        ]
    }, 
    resolve: {
        // Resolve path alias, so we don't have to put "../", etc.
        alias: {
            Base: path.resolve(__dirname, "source/base"), 
            Page: path.resolve(__dirname, "source/page"),
            Helper: path.resolve(__dirname, "source/helper"),
            Components: path.resolve(__dirname, "source/components")
        }
    }
};
