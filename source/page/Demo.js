/**
 * DBFORGE TOOL : Page/Demo
 * ======================================================================
 * Demo/sandbox page for the application.
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.com.br>
 * @since       3.0.0
 */

// Import libraries
import React, { Component } from "react";

// Import local modules

// Main component class
export default class Demo extends Component {
    /**
     * Component constructor.
     *
     * @param {object} props
     */
    constructor(props) {
        // Always call super first!
        super(props);
        
        if (this.props.match && this.props.match.params) {
            this.state = {
                blueprint_id: this.props.match.params.blueprint_id
            };
        } else {
            // Bootstrap component state
            this.state = {
                blueprint_id: ""
            };
        }
    }
    
    /**
     * Renders the component.
     */
    render(match) {
        let has_bp = (this.state.blueprint_id) ?
            <p>Has Blueprint</p>
            :
            <p>Has No Blueprint</p>;
        
        return (
            <div className="tool__demo">
                <h4>Demo</h4>
                {has_bp}
                <p>Lorem ipsum dolor sit amet, consectetur.</p>
            </div>
        );
    }
}
