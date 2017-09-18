/**
 * DBFORGE TOOL : Components/LinkButton
 * ======================================================================
 * Button with an action attribute, for which a function can be assigned to.
 * 
 * If no action is assigned, this button become useless.
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.com.br>
 * @since       3.0.0
 */
// Import base modules
import React, { Component } from "react";

// Main component class
export default class LinkButton extends Component {
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
        this.state = {
            className: this.props.className || "",
            action: this.props.action 
        };

        // Bind redirect
        this.doAction = this.doAction.bind(this);
    }
    
    /**
     * Executes the action prop function, if assigned.
     */
    doAction() {
        // If there's an action assigned to this button, execute it
        if (this.state.action) {
            this.state.action();
        }
    };
    
    /**
     * Renders the component.
     *
     * @returns {XML}
     */
    render() {
        // Get current state and properties handler
        let curr = this.state;
        let buttonProp = {};
        
        // Build properties
        if (curr.className != "") buttonProp.className = curr.className;
        
        // Return component
        return (
            <button {...buttonProp} onClick={this.doAction} type="button">
                {this.props.children}
            </button>
        );
    }
}
