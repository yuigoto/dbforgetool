/**
 * DBFORGE TOOL : Components/AboutScreen
 * ======================================================================
 * Renders the about/info screen, and just that.
 *
 * The close button depends on the "action" prop.
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.com.br>
 * @since       3.0.0
 */
// Import base module
import React, { Component } from "react";

// Import application components
import ActionButton from "Components/ActionButton";

// Main component class
export default class ToolHeader extends Component {
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
            visible: this.props.visible,
            action: this.props.action
        };
    }
    
    /**
     * Renders the component.
     *
     * @returns {XML}
     */
    render() {
        // Define class
        let className = "tool__header-info";
        
        // Set visibility status
        if (this.props.visible) className += " in";
        
        // Return component
        return (
            <div className={className}>
                <ActionButton className="tool__header-button"
                              action={this.state.action}>
                    <i className="fa fa-times"></i> Close
                </ActionButton>
                <h4>DBForge Tool</h4>
                <p>by Fabio Y. Goto</p>
            </div>
        );
    }
}
