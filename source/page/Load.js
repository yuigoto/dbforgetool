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
import ActionButton from "Components/ActionButton";
import LinkButton from "Components/LinkButton";
import Stacks from "Helper/Stacks";

// Main component class
export default class Load extends Component {
    /**
     * Component constructor.
     *
     * @param {object} props
     *      Component properties object
     */
    constructor(props) {
        // Call super constructor
        super(props);
        
        // Create a stack instance
        this.stacks = new Stacks("dbforge_stack");
        
        // Set initial state
        this.state = {
            blueprint_list: this.stacks.browse()
        };
    
        this.blueprintDeleteDialog = this.blueprintDeleteDialog.bind(this);
        this.blueprintDownload = this.blueprintDownload.bind(this);
    }
    
    /**
     * Triggers the delete blueprint dialog.
     *
     * @param {string} id
     *      Blueprint ID
     */
    blueprintDeleteDialog(id) {
        console.log(id);
    }
    
    /**
     * Renders the blueprint list.
     *
     * @returns {XML}
     */
    blueprintList() {
        let curr = this.state;
        
        if (curr.blueprint_list.length > 0) {
            // Need to pass second argument so we can preserve scope for this
            return curr.blueprint_list.map(this.blueprintListItem, this);
        } else {
            // No blueprints! :(
            return (
                <p className="tool__load-void">
                    There are no saved blueprints.
                </p>
            );
        }
    }
    
    blueprintDownload(id) {
        this.stacks.saveFile(id);
    }
    
    /**
     * Used when mapping the blueprint list array.
     *
     * @param {object} item
     *      Object containing the item data
     * @param {integer} index
     *      Unique integer for index
     * @returns {XML}
     */
    blueprintListItem(item, index) {
        // Set variables
        let info, nums, date;
        
        // If info was saved
        info = (item.info) ? <p><em>{item.info}</em></p> : "";
        
        // Check number of fields
        if (item.columns.length > 0) {
            nums = <p className="small"><em>{item.columns.length} columns</em></p>;
        } else {
            nums = <p className="small"><em>No columns</em></p>;
        }
        
        // Define date and format it
        date = new Date(item.date);
        date = date.toLocaleString().replace(
            /([0-9]{2}\/[0-9]{2}\/[0-9]{4})\s([0-9]{2}):([0-9]{2}):([0-9]{2})/,
            "$1 @ $2:$3"
        );
        date = <p className="small"><em>Last modified: {date}</em></p>;
        
        // Return element
        return (
            <div key={index} className="tool__load-item">
                <h5>{item.name}</h5>
                {info}
                {nums}
                {date}
                <div className="tool__load-item-menu">
                    <LinkButton to={"/edit/" + item.id}
                                className="demo">
                        Edit
                    </LinkButton>
                    <ActionButton action={() => {this.blueprintDeleteDialog(item.id);}}
                                  className="demo">
                        Delete
                    </ActionButton>
                    <ActionButton action={() => {this.blueprintDownload(item.id);}}
                                  className="demo">
                        Download
                    </ActionButton>
                </div>
            </div>
        );
    }
    
    /**
     * Renders the component.
     *
     * @returns {XML}
     */
    render() {
        // Blueprints list
        let bp_list = this.blueprintList();
        
        return (
            <div className="tool__home">
                <h4>Load</h4>
                <LinkButton className="hello-dumbo" to="/">
                    Home
                </LinkButton>
                {bp_list}
            </div>
        );
    }
}
