/**
 * DBFORGE TOOL : Base/ToolFooter
 * ======================================================================
 * Simple, static, footer for the application.
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.com.br>
 * @since       3.0.0
 */
// Import base module
import React, { Component } from "react";

// Main component class
export default class ToolFooter extends Component {
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
    }
    
    /**
     * Renders the component.
     *
     * @returns {XML}
     */
    render() {
        return (
            <footer>
                <p>&copy;2017 Fabio Y. Goto</p>
            </footer>
        );
    }
}
