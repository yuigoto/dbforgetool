import React, { Component } from "react";
import { Route } from "react-router-dom";

// Import local modules
import Routes from "src/core/Routes";

// Component class
export default class Wrap extends Component {
    /**
     * Component constructor.
     * 
     * @param {object} props 
     */
    constructor(props) {
        super(props);

        // Set initial state
        this.state = {};

        // Application routes
        this.routes = Routes;
    }

    renderRoutes(route, index) {
        return (
            <Route key={index} 
                   path={route.path}
                   exact={route.exact}
                   component={route.component}/>
        );
    }

    render() {
        let routes = this.routes.map(this.renderRoutes);

        return (
            <div>
                {routes}
            </div>
        );
    }
}
