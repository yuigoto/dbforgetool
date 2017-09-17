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
import LinkButton from "Components/LinkButton";
import TextInput from "Components/TextInput";

// Main component class
export default class Home extends Component {
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
        this.state = {};
    }
    
    /**
     * Renders the component.
     *
     * @returns {XML}
     */
    render() {
        return (
            <div className="tool__home">
                <h4>Home</h4>
                <LinkButton className="hello-dumbo" to="/edit">
                    I am a Button
                </LinkButton>
                <TextInput label="Hello" title="demo" value="Namu"/>
            </div>
        );
    }
}
