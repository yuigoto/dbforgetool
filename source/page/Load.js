/**
 * DBFORGE TOOL : Page/Load
 * ======================================================================
 * Shows a list of all the blueprints stored locally, for loading.
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.com.br>
 * @since       3.0.0
 */

// Import libraries
import React, { Component } from "react";
import { Link } from "react-router-dom";

// Import local modules
import Stacks from "Helper/Stacks";

// Main component class
export default class Load extends Component {
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
        
        // Bootstrap component state
        this.state = {
            blueprint_list: this.stacks.browse()
        };
    }
    
    /**
     * Renders the component.
     */
    render() {
        // Handles listing
        let item_list = [];
        
        // Blueprint list alias
        let blueprints = this.state.blueprint_list;
        
        // Only fill list if one or more items exist
        if (blueprints.length > 0) {
            for (var n in blueprints) {
                // Item alias
                let item = blueprints[n];
                let link = "/edit/" + item.id;
                
                // Push
                item_list = (
                    <Link to={link}>{item.name}</Link>
                );
            }
        } else {
            item_list = (
                <div className="tool__load-void">
                    <p>Nothing to see here, shoo!</p>
                    <p>
                        <a href="/">
                            <strong>GO BACK TO WHERE YOU CAME FROM!</strong>
                        </a>
                    </p>
                </div>
            );
        }
        
        return (
            <div className="tool__edit">
                <h4>Load</h4>
                <div className="tool__load-list">
                    {item_list}
                </div>
            </div>
        );
    }
}
