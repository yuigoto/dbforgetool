/**
 * YUITI : DBForge Tool : Server Index
 * ======================================================================
 * This is the entry point used by Express to serve the builds locally.
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.com.br>
 * @since       3.0.0
 * @copyright   (c) 2017 Fabio Y. Goto
 */

// Require libraries, bootstrap variables
const express   = require("express");
const path      = require("path");
const port      = process.env.PORT || 32;
const app       = express();

// Set to serve the static public folder
app.use(
    express.static(__dirname + "/public")
);

// Redirect all GET requests to index
app.get(
    "*",
    function(request, response) {
        response.sendFile(path.resolve(__dirname, "public", "index.html"));
    }
);

// Set app to listen for port 32
app.listen(port);

// Logging
console.log("Local build served on port " + port);