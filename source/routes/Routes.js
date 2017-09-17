/**
 * DBFORGE TOOL : Routes/Routes
 * ======================================================================
 * Home page component.
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.com.br>
 * @since       3.0.0
 */
// Import local modules
import Home from "Page/Home";
import Edit from "Page/Edit";

/**
 * Array containing all possible menu routes.
 *
 * @type {array}
 */
const AppRoute = [
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
        component: Home
    },
    {
        name: "Edit",
        path: "/edit/:blueprint_id?",
        exact: false,
        component: Edit
    }
];

// Export module
module.exports.AppRoute = AppRoute;
