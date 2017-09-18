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

// Main component class
class ToolHeader extends Component {
    /**
     * Renders the component.
     *
     * @returns {XML}
     */
    render() {
        let _now;
        return (
            <header>
                Hello
            </header>
        );
    }
}

// Export component
export default withRouter(ToolHeader);
