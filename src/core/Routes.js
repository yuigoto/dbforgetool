/**
 * 
 */

import Home from "src/views/page/Home";
import Edit from "src/views/page/Edit";
import Load from "src/views/page/Load";

const Routes = [
    {
        name: "Home", 
        path: "/", 
        exact: true, 
        component: Home
    }, 
    {
        name: "Load", 
        path: "/load", 
        exact: false, 
        component: Edit
    }, 
    {
        name: "Edit", 
        path: "/edit/:blueprint_id?", 
        exact: false, 
        component: Load
    }
];

// Export
module.exports = Routes;
