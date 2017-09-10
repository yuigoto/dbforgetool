/**
 * DBFORGE TOOL : Dummy
 * ======================================================================
 * Dummy file, for reference use only.
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.com.br>
 * @since       3.0.0
 */

// Import libraries
import React, { Component } from "react";

// Import local modules

// Main component class
export default class Dummy extends Component {
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
            num: 0
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
     * Renders the component.
     */
    render() {
        return (
            <div className="dummy">
                <p>This is a dummy component, DO NOT USE in production.</p>
                <h1>
                    {this.state.num}
                </h1>
                <button onClick={this.updateState.bind(this)}>
                    Increase Counter
                </button>
            </div>
        );
    }
}
