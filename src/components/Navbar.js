import React, { Component } from 'react';

// Import Materialize
import M from "materialize-css";

class Navbar extends Component {

  componentDidMount() {
    M.AutoInit();
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper blue-grey lighten-5">
          <div className="brand-logo center blue-grey-text">EatMood</div>
        </div>
      </nav>
    );
  }
}

export default Navbar;