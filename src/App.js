import React, { Component } from 'react';

import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Dishes from './components/Dishes';
import AddDish from './components/AddDish';


// Import Materialize
import M from "materialize-css";
import Sidebar from './components/Sidebar';

class App extends Component {
  state = {
    searchedIngredient: "",
    filterType: ""
  }

  componentDidMount() {
    M.AutoInit();
  }

  handleSearch = (searchedIngredient) => {
      this.setState({
        searchedIngredient : searchedIngredient,
        filterType : ""
      });
  }

  handleFilter = (type) =>{
      this.setState({
        searchedIngredient : "",
        filterType : type
      });
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <AddDish />
        <SearchBar handleSearch={this.handleSearch}/>
        {console.log(this.state)}
        <div className="row">
          <div className="input-field col s1 offset-s1"> 
            <Sidebar handleFilter={this.handleFilter}/>
          </div>
          <div className="input-field col s9">
          <Dishes searchedIngredient={this.state.searchedIngredient} filterType={this.state.filterType}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;