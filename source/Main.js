/**
 * DBFORGE TOOL : Main
 * ======================================================================
 * Application entry point/root.
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.com.br>
 * @version     3.0.0
 * @license     MIT License
 * @copyright   (c) 2017 Fabio Y. Goto
 */

// Import base stuff
import React from "react";
import { render as Render } from "react-dom";

// Import main component
import Tool from "Base/Tool";
//import Blueprints from "Helper/Blueprints";
//import Stacker from "Helper/Stacker";
//import Md5 from "crypto-js/md5";

const test = (err, result) => {
    if (!err) {
        console.log(result);
    }
};

// Set main element for rendering
const main = document.getElementById("tool");

//const stacker = new Stacker("dbforge_stack");

// console.log(stacker.insertBlueprint(new Date().toISOString(), test));

// console.log(stacker.browseBlueprints());

// Render application
Render(
    <Tool />,
    main
);
