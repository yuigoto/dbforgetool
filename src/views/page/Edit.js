import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Edit extends Component {
    render() {
        return (
            <div>
                <NavLink to="/">
                    Home
                </NavLink>
                <NavLink to="/load">
                    Load
                </NavLink>
            </div>
        );
    }
}
