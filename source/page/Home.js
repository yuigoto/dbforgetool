/**
 * DBFORGE TOOL : Page/Home
 * ======================================================================
 * Home screen of the application.
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.com.br>
 * @since       3.0.0
 */

// Import libraries
import React, { Component } from "react";
import { Link } from "react-router-dom";

// Import local modules

// Main component class
export default class Home extends Component {
    /**
     * Component constructor.
     *
     * @param {object} props
     */
    constructor(props) {
        // Always call super first!
        super(props);
        
        // Bootstrap component state
        this.state = {};
    }
    
    /**
     * Renders the component.
     */
    render() {
        return (
            <div className="tool__home">
                <h4>Home</h4>
                <p>Lorem ipsum dolor sit amet, consectetur.</p>
                
                <ul>
                    <li>
                        <Link to="/edit">Create Blueprint</Link>
                    </li>
                    <li>
                        <Link to="/load">Load Blueprint</Link>
                    </li>
                </ul>
            </div>
        );
    }
}
