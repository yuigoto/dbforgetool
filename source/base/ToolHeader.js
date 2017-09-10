/**
 * DBFORGE TOOL : Base/ToolHeader
 * ======================================================================
 * Application header.
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.com.br>
 * @since       3.0.0
 */
// Import libraries
import React, { Component } from "react";

// Import local modules

// Main component class
export default class ToolHeader extends Component {
    /**
     * Component constructor.
     *
     * @param {object} props
     */
    constructor(props) {
        // Always call super first!
        super(props);
        
        // Check path prop
        let path = "";
        let home = true;
        if (this.props.location && this.props.match.params) {
            path = this.props.match.url;
            
            // Not home
            if (path != "/") home = false;
        }
        
        // Bootstrap component state
        this.state = {
            is_home: home,
            path: path,
            view_info: false,
            home_message: false,
            redirect_home: false
        };
    }
    
    /**
     * Triggers the "are you sure you want to go home?" message, when editing.
     */
    moveHome() {
        // State alias
        let curr = this.state;
        
        if (this.state.path == "/edit") {
            curr.home_message = true;
        } else {
            //this.state.redirect_home = true;
            this.props.history.push("/");
        }
    
        // Update state
        this.setState(curr);
    }
    
    /**
     * Toggles the info screen on and off.
     */
    viewInfo() {
        // State alias
        let curr = this.state;
        
        // Update state
        curr.view_info = !curr.view_info;
        
        // Update state
        this.setState(curr);
    }
    
    /**
     * Renders the component.
     */
    render() {
        const { match, location, history } = this.props;
        
        // If redirecting to home
        if (this.state.path != "" && this.state.redirect_home === true) {
            return <Redirect to="/" push={true} />;
        } else {
            // About screen handler
            let info_class = (this.state.view_info) ? "tool__info in" : "tool__info";
    
            // Show info
            let info = (
                <div className={info_class}>
                    <h5>DBForge Tool</h5>
                    <p>by Fabio Y. Goto</p>
                    <button onClick={this.viewInfo.bind(this)}>
                        X
                    </button>
                </div>
            );
    
            // Check props to properly set a "go home" menu item
            let menu = [];
    
            // If the user's editing or loading
            if (!this.state.is_home) {
                menu.push(
                    <button key="menu-home" onClick={this.moveHome.bind(this)}>
                        HOME
                    </button>
                );
            }
    
            // Always add an info Link
            menu.push(
                <button key="menu-item" onClick={this.viewInfo.bind(this)}>
                    INFO
                </button>
            );
    
            return (
                <header>
                    <h3>DBForge Tool</h3>
                    <p>by Fabio Y. Goto</p>
            
                    <div className="tool__head-menu">
                        {menu}
                    </div>
                    {info}
                </header>
            );
        }
    }
}

