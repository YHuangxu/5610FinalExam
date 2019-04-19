import React, { Component } from "react";
import { NavLink } from "react-router-dom";


export default class NavBar extends Component {
  render() {
    return (
      <div className="navbar-container">
        <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <div className="nav-item ml-auto">
            
          </div>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-header">
          <h2>5610 Final - Yanwen Huangxu</h2>
        </div>

        </nav>
      </div>
    );
  }
}
