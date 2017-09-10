/**
 * DBFORGE TOOL : Base/ToolFooter
 * ======================================================================
 * Application footer.
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.com.br>
 * @since       3.0.0
 */
// Import libraries
import React, { Component } from "react";

// Import local modules

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
     */
    render() {
        return (
            <footer>
                <p>©2017 Fabio Y. Goto</p>
            </footer>
        );
    }
}
