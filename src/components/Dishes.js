import React, { Component } from 'react';
import DishCard from './DishCard';
import axios from 'axios';
import { isEqual } from 'lodash';

class Dishes extends Component {
  state = {
    dishNames: []
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('[componentDidUpdate] @ Dishes.js');
    if (isEqual(prevProps, this.props) && isEqual(prevState, this.state)) {
      return;
    }

    if (this.props.searchedIngredient){
      axios.get(`https://cs411-backend.herokuapp.com/dishes/${this.props.searchedIngredient}`)
      .then(res => {
        // console.log(res.data.results)
        this.setState({dishNames: res.data.results.map(x => x.dishName)});
        // console.log(this.state)
      })
      .catch(err => console.error(err));
    }

    if (this.props.filterType){
      axios.get(`https://cs411-backend.herokuapp.com/types/${this.props.filterType}`)
      .then(res => {
        // console.log(res.data.results)
        this.setState({dishNames: res.data.results.map(x => x.name)});
        // console.log(this.state)
      })
      .catch(err => console.error(err));
    }

  }

  handleDelete = (dishName) => {
    axios.delete(`https://cs411-backend.herokuapp.com/dishes/${dishName}`)
      .then(res => {
        this.setState({dishNames: this.state.dishNames.filter(x => x !== dishName)});
      })
      .catch(err => console.error(err));
  }

  handleChangeDishName = (oldName, newName) => {
    axios.put(`https://cs411-backend.herokuapp.com/dishes`, {
      oldName,
      newName
    })
      .then(_ => {
        this.setState(prevState => {
          return {
            dishName: prevState.dishNames.map(x => x === oldName ? newName : x)
          }
        });
      })
      .catch(err => console.error(err));
  }
  
  render() {
    const dishcards = this.state.dishNames.map(dn => <DishCard collectionAdded={this.props.collectionAdded} handleCollectionChange={this.props.handleCollectionChange} dishName={dn} key={dn} handleDelete={this.handleDelete} handleChangeDishName={this.handleChangeDishName} />)
    return (
      // <div className="container">
        <div className="row">
          {dishcards}
        </div>
      //  </div>
    );
  }
}

export default Dishes;