/**
 * DBFORGE TOOL : Base/Tool
 * ======================================================================
 * Application main component, acts as a wrapper for header, footer and the
 * application sections.
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.com.br>
 * @since       3.0.0
 */
// Import base modules
import React, { Component } from "react";
import { Route } from "react-router-dom";

// Import application components
import { AppRoute } from "Routes/Routes";
import Header from "Base/ToolHeader";
import Home from "Page/Home";
import Edit from "Page/Edit";

// Main component class
export default class Tool extends Component {
    /**
     * Component constructor.
     *
     * @param {object} props
     *      Component properties object
     */
    constructor(props) {
        // Call super constructor
        super(props);
        
        // Set initial state
        this.state = {};
        
        // Application routes
        this.routes = [
            {
                path: "/",
                exact: true
            }
        ];
    
        // Define home menu routes
        this.routes = AppRoute;
        console.log(this.routes);
    }
    
    /**
     * Callback used to handle routes, when mapping the array.
     *
     * @param {object} route
     *      Route data object
     * @param {integer} index
     *      Route unique index
     * @returns {XML}
     */
    routesHandle(route, index) {
        return (
            <Route key={index}
                   path={route.path}
                   exact={route.exact}
                   component={route.component}/>
        );
    }
    
    /**
     * Renders the component.
     *
     * @returns {XML}
     */
    render() {
        // Mapping routes to components
        let routes = this.routes.map(this.routesHandle);
        
        // Render the component
        return (
            <div className="tool__wrap">
                <Header />
                {routes}
            </div>
        );
    }
}
