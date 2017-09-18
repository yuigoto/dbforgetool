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
import TextInput from "Components/TextInput";
import ToggleSwitch from "Components/ToggleSwitch";

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
     * This is just a test action, which logs something to the console.
     */
    testAction() {
        console.log("Hello from the Test Action!");
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
                <ActionButton action={this.testAction}>
                    No Action! :(
                </ActionButton>
                <ToggleSwitch label="Oi?" title="gogo" value={true}/>
                <TextInput label="Hello" title="demo" value="Namu"/>
            </div>
        );
    }
}
