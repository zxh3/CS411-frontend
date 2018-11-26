import React, { Component } from 'react';
import axios from 'axios';
import Auth from './Auth';

class AddToCollection extends Component {
  componentDidMount() {
    console.log(this.props.dishName);
    let token = Auth.decodeToken();
    let { email } = token.data;
    this.setState({email: email});
  }

  handleAdd = (id) => {
    console.log(`Adding ${this.props.dishName} to ${id}`);
    axios.post('http://localhost:2018/addToCollection', {
      dishName: this.props.dishName,
      collectionid: id
    });
    this.props.handleCollectionChange();
  }

  render() {
    let collections = this.props.collections.map(item => (
      <li onClick={() => this.handleAdd(item.id)} key={item.id + this.props.dishName}>{item.collectionName}</li>
    ));

    return (
      <div>
        <div className="dropdown-trigger right btn-floating waves-effect waves-light orange lighten-3" data-target={`dropdown${this.props.dishName}`}><i className="material-icons">favorite</i></div>
        <ul id={`dropdown${this.props.dishName}`} className='dropdown-content'>
          {collections}
        </ul>
      </div>
    );
  }
}

export default AddToCollection;