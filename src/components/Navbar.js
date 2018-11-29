import React, { Component } from 'react';
import ViewRecommend from './ViewRecommend';
import M from "materialize-css";
import Auth from './Auth';


class Navbar extends Component {

  componentDidMount() {
    M.AutoInit();
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper lighten-5">
          {Auth.isUserAuthenticated() ? <ViewRecommend/> : null}
          <div data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></div>
          <img className="lazy2" src="https://png2.kisspng.com/sh/f3c88d4b8306d335ecea7f6984588b7c/L0KzQYm3UsIzN5hvj5H0aYP2gLBuTfRqdV54jd82cHnxdbL3kPxmNZN6hp98bnnme7b5hP9wbJ1qRdR7ZXHudrL6lL1zgZYyiNt3ZXHzgL3sTfJ2dl46eapuZXPmRInqWPUyP186SaMCMEO0RYK8Uck0OWc2TqYAN0W6PsH1h5==/kisspng-dim-sum-pineapple-bun-snickerdoodle-breakfast-rye-pineapple-bun-5a8eecc48c8e17.5117031515193161645757.png" alt="Pineapple bun" style={{width:"5%", marginLeft:"36%"}}></img>
          <div className="brand-logo center white-text">EatMood</div>
        </div>
      </nav>
    );
  }
}

export default Navbar;