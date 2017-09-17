/**
 * DBFORGE TOOL : Page/Home
 * ======================================================================
 * Home page component.
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.com.br>
 * @since       3.0.0
 */
// Import base modules
import React, { Component } from "react";
import { Link } from "react-router-dom";

// Import application components
import LinkButton from "Components/LinkButton";

// Main component class
export default class Edit extends Component {
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
            <div className="tool__home">
                <p>Edit</p>
                <LinkButton className="hello-dumbo" to="/">
                    Home
                </LinkButton>
            </div>
        );
    }
}
