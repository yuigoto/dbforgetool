/**
 * DBFORGE TOOL : Components/TextInput
 * ======================================================================
 * Text Input component, wrapped in a div with a label.
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.com.br>
 * @since       3.0.0
 */
// Import base modules
import React, { Component } from "react";

// Main component class
export default class TextInput extends Component {
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
            value: this.props.value
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
        curr.value = event.target.value;
        
        // Is there an onChange callback? Then execute
        if (this.props.onChange) {
            // onChange should accept the `title` and `value` params
            this.props.onChange(this.state.title, this.state.value);
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
        // Return component
        return (
            <div className="tool__form-fields">
                <label>{this.state.label}</label>
                <input type="text"
                       title={this.state.title}
                       value={this.state.value}
                       onChange={this.doUpdate}/>
            </div>
        );
    }
}
