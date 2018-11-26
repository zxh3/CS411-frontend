import React, { Component } from 'react';
import Collection from './Collection';
import Auth from './Auth';
import axios from 'axios';

class Collections extends Component {
  state = {
    collectionids: [],
    newCollection: '',
    email: ''
  }

  handleDelete = (collectionid) => {
    let newids = this.state.collectionids.filter(id => id !== collectionid);

    axios.delete(`http://localhost:2018/deletecollection/${collectionid}`)
      .then(_ => {
        this.setState({collectionids: newids});    
      })
      .catch(err => console.error(err));
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let email = this.state.email;
    let collectionName = this.state.newCollection;
    axios.post('http://localhost:2018/addcollection', {
      email,
      collectionName
    }).then(res => {
      axios.get(`http://localhost:2018/usercollection/${email}`)
      .then(res => {
        this.setState({
          collectionids: res.data.result.map(x => x.collectionid),
          newCollection: ''
        })
      })
      .catch(err => {
        console.error(err);
      });
    })
    .catch(err => console.error(err));
  }

  componentDidMount() {
    let token = Auth.decodeToken();
    let { email } = token.data;
    this.setState({email: email});
    axios.get(`http://localhost:2018/usercollection/${email}`)
      .then(res => {
        this.setState({
          collectionids: res.data.result.map(x => x.collectionid)
        })
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    let collections = this.state.collectionids.map((id) => {
      return (
        <Collection collectionChange={this.props.collectionChange} key={id} collectionid={id} handleDelete={this.handleDelete} />
      );
    })

    return (
      <div className="container">
        <div className="row">
          {collections}
        </div>
        <div className="row">
          <form className="col s6" onSubmit={this.handleSubmit}>
            <label htmlFor="newCollection">New Collection</label>
            <input name="newCollection" type="text" value={this.state.newCollection} onChange={this.handleChange} autoComplete="off" />
            <button className="btn blue" type="submit">add</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Collections;