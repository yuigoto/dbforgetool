/**
 * DBFORGE TOOL : Components/Column
 * ======================================================================
 * Handles a single column on the blueprint editor.
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.com.br>
 * @since       3.0.0
 */

// Import libraries
import React, { Component } from "react";

// Import local modules
import FormText from "Components/FieldsText";

// Main component class
export default class Column extends Component {
    /**
     * Component constructor.
     *
     * @param {object} props
     */
    constructor(props) {
        // Always call super first!
        super(props);
        
        // Bootstrap component state
        this.state = {
            data: this.props.column
        };
    }
    
    /**
     * Test click event.
     */
    updateState() {
        // Set state alias
        var curr = this.state;
        
        // Increase
        curr.num += 1;
        
        // Update state
        this.setState(curr);
    }
    
    /**
     * Updates a single field on the state.
     */
    updateField(name, data) {
        let item_name = name;
        let item_data = data;
        
        console.log(item_data);
    
        // Set state alias
        let curr = this.state;
    
        // Update field
        curr.data[item_name] = item_data;
    
        // Update state
        this.setState(curr);
    }
    
    /**
     * Renders the component.
     */
    render() {
        let name = <h5 className="void">no_name</h5>;
        
        if (this.state.data.name) {
            name = <h5>{this.state.data.name}</h5>;
        }
        
        return (
            <div className="tool__column">
                <div className="tool__column-info">
                    {name}
                    <FormText name="Table Name"
                              value={this.state.data.name}
                              title="name"
                              onChange={this.updateField.bind(this)}/>
                    
                    <FormText name="Table Description"
                              value={this.state.data.info}
                              title="info"
                              onChange={this.updateField.bind(this)}/>
                </div>
            </div>
        );
    }
}
