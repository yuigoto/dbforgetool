/**
 * DBFORGE TOOL : Page/Edit
 * ======================================================================
 * The "core" of the application, the blueprint editor.
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.com.br>
 * @since       3.0.0
 */

// Import libraries
import React, { Component } from "react";

// Import local modules
import Blueprints from "Helper/Blueprints";
import Stacks from "Helper/Stacks";

// Main component class
export default class Edit extends Component {
    /**
     * Component constructor.
     *
     * @param {object} props
     */
    constructor(props) {
        // Always call super first!
        super(props);
    
        // Create an instance of stacks
        this.stacks = new Stacks("dbforge_stack");
        
        // Initial blueprint ID and data states
        let blueprint_id = "";
        let blueprint_data = {};
        let is_new = true;
        
        // Route parameters handle
        const routes = this.props.match;
        
        // Check if the blueprint ID was declared
        if (routes && routes.params.blueprint_id) {
            // Set blueprint ID from params
            blueprint_id = routes.params.blueprint_id;
            
            // Get data
            blueprint_data = this.stacks.select(blueprint_id);
            
            // If the data wasn't properly loaded
            if (blueprint_data) {
                is_new = false;
            } else {
                // Create a new blueprint as fallback
                blueprint_data = Blueprints.generateBlankBlueprint();
                blueprint_id = blueprint_data.id;
            }
        } else {
            // Create a new blueprint
            blueprint_data = Blueprints.generateBlankBlueprint();
            blueprint_id = blueprint_data.id;
        }
        
        // Bootstrap component state
        this.state = {
            is_new: is_new,
            blueprint_id: blueprint_id,
            data: blueprint_data,
            message_in: false,
            message_out: false,
            message: ""
        };
    }
    
    /**
     * Closes the alert window.
     */
    closeAlert() {
        // State alias
        let curr = this.state;
        
        // Set trigger
        curr.message_out = true;
        
        // Set timeout for resetting everything
        setTimeout(() => {
            // State alias
            let curr = this.state;
            
            // Reset messages
            curr.message = "";
            curr.message_in = false;
            curr.message_out = false;
        }, 500);
    
        // Update state
        this.setState(curr);
    }
    
    /**
     * Saves the current blueprint to local storage.
     */
    save() {
        // State alias
        let curr = this.state;
        
        if (curr.data.columns.length < 1) {
            // Set message in
            curr.message_in = true;
    
            // Set message
            curr.message = "You're trying to save a blueprint with no columns.";
        } else {
            // If there are columns, check if there's a title attribute
            if (curr.data.name != "") {
                // Save blueprint to local storage
                this.stacks.update(curr.data);
        
                // Update blueprint as not new
                curr.is_new = false;
            } else {
                // Set message in
                curr.message_in = true;
        
                // Set message
                curr.message = "You must provide a table name before saving it.";
            }
        }
        
        // Update state
        this.setState(curr);
    }
    
    /**
     * Renders the component.
     */
    render() {
        // State handler
        let state = this.state;
        
        // Define the title for the page
        let title = (this.state.is_new)
            ? <h4>New Blueprint</h4>
            : <h4>Editing Blueprint: <em>{this.state.data.name}</em></h4>;
        
        let alerts_view;
    
        if (state.message && state.message_in && !state.message_out) {
            alerts_view = "tool__alerts in";
        } else if (state.message && state.message_in && state.message_out) {
            alerts_view = "tool__alerts out";
        } else {
            alerts_view = "tool__alerts";
        }
        
        let alerts = (
            <div className={alerts_view}>
                <p>{this.state.message}</p>
                <button onClick={this.closeAlert.bind(this)}>X</button>
            </div>
        );
        
        return (
            <div className="tool__home">
                {alerts}
                {title}
                <p>Lorem ipsum dolor sit amet, consectetur.</p>
                <button onClick={this.save.bind(this)}>
                    Save
                </button>
            </div>
        );
    }
}
