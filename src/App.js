import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'

import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Dishes from './components/Dishes';
import AddDish from './components/AddDish';
import Sidebar from './components/Sidebar';
import Authentication from './components/Authentication';
import Collections from './components/Collections';


// Import Materialize
import M from "materialize-css";
import Auth from './components/Auth';

class App extends Component {
  state = {
    searchedIngredient: "",
    auth: 0,
    filterType: "",
    collectionChange: 0
  }

  handleCollectionChange = () => {
    console.log('[handleCollectionChange]');
    this.setState((prevState) => ({
      collectionChange: 1 - prevState.collectionChange
    }));
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
    let authContent = (
      <div>
        <hr />
        <br />
        <Collections collectionChange={this.state.collectionChange} />
      </div>
    );
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />

          
          <ul id="slide-out" className="sidenav">
            <Authentication handleAuth={this.handleAuth} auth={this.props.auth} />
          </ul>
          

          <AddDish />
          <SearchBar handleSearch={this.handleSearch} />

          <div className="row">
            <div className="input-field col s1 offset-s1">
              <Sidebar handleFilter={this.handleFilter}/>
            </div>
            <div className="input-field col s9">
              <Dishes handleCollectionChange={this.handleCollectionChange} searchedIngredient={this.state.searchedIngredient} filterType={this.state.filterType}/>
            </div>
          </div>

          {Auth.isUserAuthenticated() ? authContent : null}          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;