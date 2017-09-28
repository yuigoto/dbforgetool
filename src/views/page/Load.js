import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Load extends Component {
    render() {
        return (
            <div>
                <NavLink to="/">
                    Home
                </NavLink>
                <NavLink to="/edit">
                    Edit
                </NavLink>
            </div>
        );
    }
}
