import React, { Component } from 'react';

import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Dishes from './components/Dishes';
import AddDish from './components/AddDish';

// Import Materialize
import M from "materialize-css";

class App extends Component {
  state = {
    searchedIngredient: ""
  }

  componentDidMount() {
    M.AutoInit();
  }

  handleSearch = (searchedIngredient) => {
    this.setState({
      searchedIngredient
    });
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <AddDish />
        <SearchBar handleSearch={this.handleSearch}/>
        <Dishes searchedIngredient={this.state.searchedIngredient} />
      </div>
    );
  }
}

export default App;
