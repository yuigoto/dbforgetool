/**
 * DBFORGE TOOL : Components/SelectBox
 * ======================================================================
 * Simple select box component, wrapped in a div, with a label.
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.com.br>
 * @since       3.0.0
 */
// Import base modules
import React, { Component } from "react";

// Main component class
export default class SelectBox extends Component {
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
            value: this.props.value,
            list: this.props.list
        };
        
        // Bind the update function
        this.doUpdate = this.doUpdate.bind(this);
    }
    
    /**
     * Update event listener for the select field.
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
            this.props.onChange(curr.title, curr.value);
        }
        
        // Update state
        this.setState(curr);
    }
    
    /**
     * Builds options for the select box, bases on the list prop.
     *
     * @returns {XML}
     */
    option(item, index) {
        return (
            <option key={index}
                    value={item.value}>
                {item.name}
            </option>
        );
    }
    
    /**
     * Renders the component.
     *
     * @returns {XML}
     */
    render() {
        // Alias for state
        let curr = this.state;
        let item;
        
        // Item list will only be filled if there's something in list
        if (Array.isArray(curr.list) && curr.list.length > 0) {
            item = curr.list.map(this.option);
        } else {
            item = <option value="">----------</option>;
        }
        
        // Return component
        return (
            <div className="tool__form-fields">
                <label>{curr.label}</label>
                <select value={curr.value}
                        title={curr.title}
                        onChange={this.doUpdate}>
                    {item}
                </select>
            </div>
        );
    }
}
