import React, { Component } from 'react';
import axios from 'axios';
import { isEqual } from 'lodash';

class Collection extends Component {
  state = {
    dishNames: [],
    collectionName: ''
  }

  componentDidUpdate(prevProps, prevState) {
    if (isEqual(prevProps, this.props) && isEqual(prevState, this.state)) {
      return;
    }

    console.log('prevState: ');
    console.log(prevState);
    console.log('this.state: ');
    console.log(this.state);
    
    console.log('prevProps: ');
    console.log(prevProps);
    console.log('this.props: ');
    console.log(this.props);

    axios.get(`https://cs411-backend.herokuapp.com/collectionname/${this.props.collectionid}`)
      .then(res => {
        this.setState({
          collectionName: res.data.result[0].collectionName ? res.data.result[0].collectionName : ''
        });
      })
      .catch(err => console.error(err));

    axios.get(`https://cs411-backend.herokuapp.com/collectiondish/${this.props.collectionid}`)
      .then(res => {
        this.setState({
          dishNames: res.data.result.map(x => x.dishName)
        });
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    axios.get(`https://cs411-backend.herokuapp.com/collectionname/${this.props.collectionid}`)
      .then(res => {
        this.setState({
          collectionName: res.data.result[0].collectionName ? res.data.result[0].collectionName : ''
        });
      })
      .catch(err => console.error(err));

    axios.get(`https://cs411-backend.herokuapp.com/collectiondish/${this.props.collectionid}`)
      .then(res => {
        this.setState({
          dishNames: res.data.result.map(x => x.dishName)
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    let items = this.state.dishNames.map(dishName => (
      <li key={dishName} className="collection-item">
        {dishName}
      </li>
    ));

    return (
      <div>        
        <ul className="col s3 collection with-header">
          <button onClick={() => this.props.handleDelete(this.props.collectionid)} className="btn-floating red right"><i className="material-icons">delete_forever</i></button>
          <li className="collection-header"><h4>{this.state.collectionName}</h4></li>
          {items}
        </ul>
      </div>
    );
  }
}

export default Collection;