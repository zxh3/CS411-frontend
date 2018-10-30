import React, { Component } from 'react';
import DishCard from './DishCard';
import axios from 'axios';
import { isEqual } from 'lodash';

class Dishes extends Component {
  state = {
    dishNames: []
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps === this.props && isEqual(prevState, this.state)) {
      return;
    }

    axios.get(`http://localhost:2018/dishes/${this.props.searchedIngredient}`)
      .then(res => {
        this.setState({dishNames: res.data.results.map(x => x.dishName)});
      })
      .catch(err => console.error(err));
  }

  handleDelete = (dishName) => {
    axios.delete(`http://localhost:2018/dishes/${dishName}`)
      .then(res => {
        this.setState({dishNames: this.state.dishNames.filter(x => x !== dishName)});
      })
      .catch(err => console.error(err));
  }

  handleChangeDishName = (oldName, newName) => {
    axios.put(`http://localhost:2018/dishes`, {
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
    const dishcards = this.state.dishNames.map(dn => <DishCard dishName={dn} key={dn} handleDelete={this.handleDelete} handleChangeDishName={this.handleChangeDishName} />)
    return (
      <div className="container">
        <div className="row">
          {dishcards}
        </div>
      </div>
    );
  }
}

export default Dishes;