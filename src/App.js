import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'

import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Dishes from './components/Dishes';
import AddDish from './components/AddDish';
import Sidebar from './components/Sidebar';
import Authentication from './components/Authentication';


// Import Materialize
import M from "materialize-css";
import Sidebar from './components/Sidebar';

class App extends Component {
  state = {
    searchedIngredient: "",
    auth: 0,
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

  handleAuth = () => {
    console.log('[handleAuth] called');
    this.setState((state) => {
      return {
        auth: 1 - state.auth
      }
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
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Authentication handleAuth={this.handleAuth} auth={this.props.auth} />
          <AddDish />
          <SearchBar handleSearch={this.handleSearch} />

          <div className="row">
            <div className="input-field col s1 offset-s1"> 
              <Sidebar handleFilter={this.handleFilter}/>
            </div>
            <div className="input-field col s9">
              <Dishes searchedIngredient={this.state.searchedIngredient} filterType={this.state.filterType}/>
            </div>
          </div>

          {/* <Dishes searchedIngredient={this.state.searchedIngredient} /> */}


        </div>
      </BrowserRouter>
    );
  }
}

export default App;