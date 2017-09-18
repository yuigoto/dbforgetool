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
import Stacks from "Helper/Stacks";

// Main component class
export default class Load extends Component {
    /**
     * Component constructor.
     *
     * @param {object} props
     *      Component properties object
     */
    constructor(props) {
        // Call super constructor
        super(props);
        
        // Create a stack instance
        this.stacks = new Stacks("dbforge_stack");
        
        // Set initial state
        this.state = {
            blueprint_list: this.stacks.browse()
        };
    }
    
    /**
     * Renders the blueprint list.
     *
     * @returns {XML}
     */
    blueprintList() {
    }
    
    /**
     * Renders the component.
     *
     * @returns {XML}
     */
    render() {
        return (
            <div className="tool__home">
                <h4>Load</h4>
                <LinkButton className="hello-dumbo" to="/">
                    Home
                </LinkButton>
            </div>
        );
    }
}
