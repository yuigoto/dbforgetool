/**
 * DBFORGE TOOL : Components/FieldsText
 * ======================================================================
 * Handles a single column on the blueprint editor.
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.com.br>
 * @since       3.0.0
 */

// Import libraries
import React, { Component } from "react";

// Import local modules

// Main component class
export default class FieldsText extends Component {
    constructor(props) {
        // Always call super first!
        super(props);
    
        // Bootstrap component state
        this.state = {
            name: this.props.name,
            value: this.props.value,
            title: this.props.title,
            change: this.props.onChange
        };
    }
    
    update(event) {
        // Set state alias
        let curr = this.state;
    
        // Update field
        curr.value = event.target.value;
        
        if (this.state.change) {
            this.state.change(
                this.state.title,
                this.state.value
            );
        }
    
        // Update state
        this.setState(curr);
    }
    
    render() {
        return (
            <div className="tool__column-fields">
                <label>
                    {this.state.name}
                </label>
                <input type="text"
                       title={this.state.title}
                       value={this.state.value}
                       onChange={this.update.bind(this)}/>
            </div>
        );
    }
}