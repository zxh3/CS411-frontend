import React, { Component } from 'react';

class SearchBar extends Component {
  state = {
    search: ""
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleSearch(this.state.search);
    this.setState({
      search: ""
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render() {
    return (
      <div className="row">
        <form className="input-field col s6 offset-s3 center-align" autoComplete="off" onSubmit={this.handleSubmit}>
          <i className="material-icons prefix">search</i>
          <input id="search" type="text" value={this.state.search} onChange={this.handleChange} />
          <label htmlFor="search">Find a dish with an ingredient, e.g., chicken</label>
        </form>
      </div>
    );
  }
}

export default SearchBar;
