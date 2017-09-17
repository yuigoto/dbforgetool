/**
 * DBFORGE TOOL : Components/LinkButton
 * ======================================================================
 * A button that works like the Link object from "react-router-dom".
 *
 * You only need to pass a "to" parameter, with className being optional.
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.com.br>
 * @since       3.0.0
 */
// Import base modules
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// Main component class
class LinkButton extends Component {
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
            redirect: false,
            to: this.props.to
        };
        
        console.log(this.props.children);
        
        // Bind redirect
        this.redirectTo = this.redirectTo.bind(this);
    }
    
    /**
     * Redirects to the given route.
     */
    redirectTo() {
        // Get current state
        let curr = this.state;
        
        // Redirects only if the "to" param is set
        if (curr.to != "") {
            this.props.history.push(curr.to);
    
            // Update redirect status
            curr.redirect = true;
    
            // Update state
            this.setState(curr);
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
        if (this.state.className != "") buttonProp.className = curr.className;
        
        // Return component
        return (
            <button {...buttonProp} onClick={this.redirectTo} type="button">
                {this.props.children}
            </button>
        );
    }
}

// Export with Router props
export default withRouter(LinkButton);
