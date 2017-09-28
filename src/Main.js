/**
 * DBFORGE TOOL : Main
 * ======================================================================
 * Application entry point.
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.com.br>
 * @version     3.0.0
 * @license     MIT
 * @copyright   (c) 2017 Fabio Y. Goto
 */

// Import libs
import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import Wrap from "src/views/Wrap";

// Get main HTML element
const main = document.getElementById("tool");

// Render
render(
    <BrowserRouter>
        <Wrap/>
    </BrowserRouter>, 
    main
);
