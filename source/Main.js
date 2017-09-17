/**
 * DBFORGE TOOL : Main
 * ======================================================================
 * Application entry point.
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.com.br>
 * @version     3.0.0
 * @license     MIT License
 * @copyright   (c) 2017 Fabio Y. Goto
 */
// Import base modules
import React from "react";
import { render as Render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

// Import application components
import Tool from "Base/Tool";

// Main element for rendering
const main = document.getElementById("tool");

// Render application
Render(
    <Router>
        <Tool/>
    </Router>,
    main
);
