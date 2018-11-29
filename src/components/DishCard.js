import React, { Component } from 'react';
import DishCardReveal from './DishCardReveal';
import AddDishReview from './AddDishReview';
// import Review from './Review';
// import ViewReview from './ViewReview';
import axios from 'axios';
import M from 'materialize-css';
import StarRatingComponent from 'react-star-rating-component';


import Auth from './Auth';
import AddToCollection from './AddToCollection';
import ViewReview from './ViewReview';

class DishCard extends Component {
  state = {
    ingredients: [],
    restaurants: [],
    email: '',
    collections: [], // elem: {id: ___, name: ___}
    reviews: [],
    content : "",
    rating : "",
    newName: "",
    types:[],
    currDish: ""
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

    if (Auth.isUserAuthenticated()) {
      let token = Auth.decodeToken();
      let {email} = token.data;
      axios.get(`https://cs411-backend.herokuapp.com/getallusercollection/${email}`)
        .then(res => {
          this.setState({
            email: email,
            collections: res.data.result
          })
        })
        .catch(err => console.error(err));
    }
      if (this.props.dishType){
        axios.get(`https://cs411-backend.herokuapp.com/types/${this.props.dishType}`)
          .then(res => {
            this.setState({
              types: res.data.map(x => x.dishType)
            })
          })
          .catch(err => console.error(err));
      }

      axios.get(`https://cs411-backend.herokuapp.com/reviews/dishes/${this.props.dishName}`)
        .then(res => {
          this.setState({
            content: res.data.map(x => x.content),
            rating: res.data.map(x=>x.rating)
          });
          for (var i = 0; i < this.state.content.length; i++){
            let children = []
            children.push(
              <div className="row" key={i}>
                <StarRatingComponent 
                name="rate2" 
                editing={false}
                starCount={5}
                value={this.state.rating[i]}/>
                <div>{this.state.content[i]}</div>
                </div>)
            this.setState(state => ({
              reviews: [...state.reviews, children]
            }))
          }
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

  addRestaurant = (resName) => {
    this.setState(state => ({
      restaurants: [...state.restaurants, resName]
    }))
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
            {Auth.isUserAuthenticated() ? 
              <div>
                <button className="btn-floating halfway-fab waves-effect waves-light red" onClick={() => this.props.handleDelete(this.props.dishName)}><i className="material-icons">delete</i></button>
              </div>
               :
              null
              }
          </div>

          <div className="card-content">
            
            <div className="card-title">
              {Auth.isUserAuthenticated() ? <a className="material-icons right modal-trigger red-text text-lighten-2" href={`#${this.props.dishName}`}>mode_edit</a> : null}
              {this.props.dishName}
            </div>

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

            
            
            <div className="row" style={{marginTop: '5px'}}>
              <div className="col s6"> 
                <ViewReview reviews={this.state.reviews} dishName={this.props.dishName}/>
              </div>
              
              <div className="col s6"> 
                {Auth.isUserAuthenticated() ? <AddDishReview className="col s5" dishName={this.props.dishName}/> : null}
              </div>
              <div className="col s2 offset-s1">
                {Auth.isUserAuthenticated() ? <AddToCollection handleCollectionChange={this.props.handleCollectionChange} dishName={this.props.dishName} collections={this.state.collections}/> : null}
              </div>
            </div>

          </div>

          <div className="card-reveal">
              <span className="card-title"><i className="material-icons right">close</i></span>
              <DishCardReveal restaurants={this.state.restaurants} dishName={this.props.dishName} addRes={this.addRestaurant} />
          </div>

        </div>
      </div>
    );
  }
}
 
export default DishCard;