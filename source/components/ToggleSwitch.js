/**
 * DBFORGE TOOL : Components/ToggleSwitch
 * ======================================================================
 * Toggle switch for boolean values, using a checkbox, wrapped in a div 
 * with a label.
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.com.br>
 * @since       3.0.0
 */
// Import bae module
import React, { Component } from "react";

// Main component class
export default class ToggleSwitch extends Component {
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
            label: this.props.label,
            title: this.props.title,
            value: (this.props.value === true) ? true : false
        };
        
        // Bind the update function
        this.doUpdate = this.doUpdate.bind(this);
    }
    
    /**
     * Update event listener for the input field.
     *
     * @param {object} event
     *      Event object handler
     */
    doUpdate(event) {
        // Get current state
        let curr = this.state;
        
        // Update value
        curr.value = !curr.value;
        
        // Is there an onChange callback? Then execute
        if (this.props.onChange) {
            // onChange should accept the `title` and `value` params
            this.props.onChange(curr.title, curr.value);
        }
        
        // Update state
        this.setState(curr);
    }

    /**
     * Renders the component.
     *
     * @returns {XML}
     */
    render() {
        // Get current state and defines properties
        let curr = this.state;
        let prop = {};

        // Build properties
        prop.checked = curr.value;
        prop.value = "Switch";

        // Render component
        return(
            <div className="tool__form-toggle">
                <label>
                    {curr.label}
                    <input type="checkbox" {...prop} onChange={this.doUpdate}/>
                    <span></span>
                </label>
            </div>
        );
    }
}
