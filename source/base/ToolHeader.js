/**
 * DBFORGE TOOL : Base/ToolHeader
 * ======================================================================
 * A button that works like the Link object from "react-router-dom".
 *
 * You only need to pass a "to" parameter, with className being optional.
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.com.br>
 * @since       3.0.0
 */
// Import base module
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// Import application components
import ActionButton from "Components/ActionButton";
import AboutScreen from "Components/AboutScreen";
import LinkButton from "Components/LinkButton";

// Main component class
class ToolHeader extends Component {
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
        this.state = {
            about_screen: false
        };
        
        // Bind actions
        this.showAboutScreen = this.showAboutScreen.bind(this);
    }
    
    /**
     * Toggles the About Screen on and off.
     */
    showAboutScreen() {
        // Current state alias
        let curr = this.state;
        
        // Update about screen
        curr.about_screen = !curr.about_screen;
        
        // Update state
        this.setState(curr);
    }
    
    /**
     * Returns the base name of the current route.
     */
    currentRoute() {
        // Get current location
        let local = this.props.location;
        // Use regex to extract route
        let curr = local.pathname.match(/^\/([^\/]*).*$/)[1];
        // Return current route name
        return curr;
    }
    
    /**
     * Builds the header navigation bar.
     *
     * @returns {Array}
     */
    headerNavigation() {
        // Get current route
        let curr = this.currentRoute();
        
        // Menu item array
        let menu = [];
        
        // If the current screen is "load"
        if (curr == "load") {
            menu.push(
                <LinkButton key={menu.length + 1}
                            className="tool__header-button"
                            to="/">
                    <i className="fa fa-bars"></i> Home
                </LinkButton>
            );
        }
        
        // Add the "help" button (always last)
        menu.push(
            <ActionButton key={menu.length + 1}
                          className="tool__header-button"
                          action={this.showAboutScreen}>
                <i className="fa fa-info"></i> About
            </ActionButton>
        );
        
        // Return
        return menu;
    }
    
    /**
     * Renders the component.
     *
     * @returns {XML}
     */
    render() {
        // Navigation header handler
        let navi = this.headerNavigation();
        
        return (
            <header>
                Hello
                {navi}
                <AboutScreen visible={this.state.about_screen}
                             action={this.showAboutScreen}/>
            </header>
        );
    }
}

// Export component
export default withRouter(ToolHeader);
