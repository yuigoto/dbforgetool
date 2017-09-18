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
import SelectBox from "Components/SelectBox";

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
        
        // Select box dummy options
        this.select = {
            title: "select_box",
            label: "Test Select Box That Works",
            value: "KOOKOOKA!",
            list: [
                {
                    name: "option 1",
                    value: "1"
                },
                {
                    name: "option 2",
                    value: "2"
                },
                {
                    name: "option 3",
                    value: "3"
                },
                {
                    name: "kookabunga",
                    value: "KOOKOOKA!"
                }
            ]
        };
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
                <LinkButton className="hello-dumbo" to="/load">
                    Load
                </LinkButton>
                <LinkButton className="hello-dumbo" to="/edit">
                    I am a Button
                </LinkButton>
                <ActionButton action={this.testAction}>
                    No Action! :(
                </ActionButton>
                <SelectBox label={this.select.label}
                           title={this.select.title}
                           value={this.select.value}
                           list={this.select.list}/>
                <ToggleSwitch label="Oi?" title="gogo" value={true}/>
                <TextInput label="Hello" title="demo" value="Namu"/>
            </div>
        );
    }
}
