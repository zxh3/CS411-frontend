import React, { Component } from 'react';
import DishCard from './DishCard';
import axios from 'axios';

class Dishes extends Component {
  state = {
    dishNames: []
  }

  componentDidUpdate(prevProps) {
    if (prevProps === this.props) {
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
  
  render() {
    const dishcards = this.state.dishNames.map(dn => <DishCard dishName={dn} key={dn} handleDelete={this.handleDelete} />)
    return (
      <div className="container row">
        {dishcards}
      </div>
    );
  }
}

export default Dishes;