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

// Import application components
import LinkButton from "Components/LinkButton";
import Stacks from "Helper/Stacks";

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
        
        let id = this.props.match.params.blueprint_id || "";
        
        // Create a stack instance
        this.stacks = new Stacks("dbforge_stack");
        
        // Set initial state
        this.state = {
            data: this.stacks.select(id)
        };
        
        console.log(this.state.data);
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
