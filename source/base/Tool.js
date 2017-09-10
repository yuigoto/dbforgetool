/**
 * DBFORGE TOOL : Base/Tool
 * ======================================================================
 * Main application wrapper.
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.com.br>
 * @since       3.0.0
 */
// Import libraries
import React, { Component } from "react";
import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";

// Import local modules
import Header from "Base/ToolHeader";
import Footer from "Base/ToolFooter";

// Import pages
import Home from "Page/Home";
import Demo from "Page/Demo";
import Edit from "Page/Edit";
import Load from "Page/Load";

// Main component class
export default class Tool extends Component {
    /**
     * Component constructor.
     *
     * @param {object} props
     */
    constructor(props) {
        // Always call super first!
        super(props);
        
        // Bootstrap component state
        this.state = {};
    }
    
    /**
     * Renders the component.
     *
     * I'm using two `BrowseRouter` components here because I need some
     * conditional stuff to happen on the header, depending on the page
     */
    render() {
        return (
            <div className="tool__main">
                <BrowserRouter>
                    <div>
                        <Route path="/edit" component={Header}/>
                        <Route path="/edit/:blueprint_id?" component={Edit}/>
                        
                        <Route path="/load" component={Header}/>
                        <Route path="/load" component={Load}/>
                        
                        <Route path="/demo" component={Header}/>
                        <Route path="/demo/:blueprint_id?" component={Demo}/>
                        
                        <Route exact path="/" component={Header}/>
                        <Route exact path="/" component={Home}/>
                    </div>
                </BrowserRouter>
                <Footer />
            </div>
        );
    }
}
