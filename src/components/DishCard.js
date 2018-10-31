import React, { Component } from 'react';
import DishCardReveal from './DishCardReveal';
import axios from 'axios';
import M from 'materialize-css';

class DishCard extends Component {
  state = {
    ingredients: [],
    restaurants: [],
    newName: ""
  }

  componentDidMount() {
    M.AutoInit();
    axios.get(`https://cs411-backend.herokuapp.com/ingredients/${this.props.dishName}`)
      .then(res => {
        this.setState({
          ingredients: res.data.map(x => x.ingredientName)
        })
      })
      .catch(err => console.error(err));

    axios.get(`https://cs411-backend.herokuapp.com/restaurants/${this.props.dishName}`)
      .then(res => {
        this.setState({
          restaurants: res.data.map(x => x.restaurantName)
        })
      })
      .catch(err => console.error(err));
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let newName = this.state.newName;
    this.setState({newName: ""});
    this.props.handleChangeDishName(this.props.dishName, newName);
  }

  render() {
    let ingredients = <p>UNKNOWN</p>;
    if (this.state.ingredients.length > 0) {
      ingredients = <p>{this.state.ingredients.join(', ')}</p>
    }

    return (
      <div className="col s6 m4">
        <div className="card">

          <div className="card-image">
            <img className="activator" src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?cs=srgb&dl=food-dinner-lunch-70497.jpg&fm=jpg" alt="food" />
            <div className="btn-floating halfway-fab waves-effect waves-light red" onClick={() => this.props.handleDelete(this.props.dishName)}><i className="material-icons">delete</i></div>
          </div>

          <div className="card-content">
            <div className="card-title"><a className="material-icons right modal-trigger red-text text-lighten-2" href={`#${this.props.dishName}`}>mode_edit</a>{this.props.dishName}</div>

            <div id={this.props.dishName} className="modal">
              <div className="modal-content">
                <form className="input-field" onSubmit={this.handleSubmit}>
                  <input id="newName" type="text" value={this.state.newName} onChange={this.handleChange} />
                  <label htmlFor="newName">New Dish Name</label>
                  <button className="btn">Submit</button>
                </form>
              </div>
            </div>

            {ingredients}
          </div>

          <div className="card-reveal">
              <span className="card-title"><i className="material-icons right">close</i></span>
              <DishCardReveal restaurants={this.state.restaurants}/>
          </div>

        </div>
      </div>
    );
  }
}

export default DishCard;