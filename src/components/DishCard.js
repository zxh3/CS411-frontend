import React, { Component } from 'react';
import DishCardReveal from './DishCardReveal';
import AddDishReview from './AddDishReview';
import Recommend from './Recommend';
// import Review from './Review';
// import ViewReview from './ViewReview';
import axios from 'axios';
import M from 'materialize-css';
import StarRatingComponent from 'react-star-rating-component';


import Auth from './Auth';
import AddToCollection from './AddToCollection';
import ViewReview from './ViewReview';
import { isEqual } from 'lodash';

class DishCard extends Component {
  state = {
    ingredients: [],
    restaurants: [],
    email: '',
    collections: [], // elem: {id: ___, name: ___}
    content : "",
    rating : "",
    newName: "",
    types:[],
    currDish: "",
    image:"",
    update: 0
  }

  handleUpdateReview = () => {
    console.log('update called');
    this.setState(prevState => {
      return {
        update: 1 - prevState.update
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (isEqual(prevProps, this.props) && isEqual(prevState, this.state)) {
      return;
    }
    console.log('prevProps.collectionAdded: ', prevProps.collectionAdded);
    console.log('this.props.collectionAdded: ', this.props.collectionAdded);

    console.log('[[[UPDATE!!!]]]');

    axios.get(`https://cs411-backend.herokuapp.com/reviews/dishes/${this.props.dishName}`)
    .then(res0 => {

      if (Auth.isUserAuthenticated()) {
        let token = Auth.decodeToken();
        let {email} = token.data;
        axios.get(`https://cs411-backend.herokuapp.com/getallusercollection/${email}`)
          .then(res => {
            this.setState({
              email: email,
              collections: res.data.result,
              content: res0.data.map(x => x.content),
              rating: res0.data.map(x => x.rating)
            })
          })
          .catch(err => console.error(err));
      }

    }).catch(err => console.error(err));
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

    axios.get(`https://cs411-backend.herokuapp.com/image/${this.props.dishName}`)
      .then(res => {
        this.setState({
          image: res.data.results[0].image
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
            rating: res.data.map(x => x.rating)
          });
        }).catch(err => console.error(err));
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

    let children = [];
    for (var i = 0; i < this.state.content.length; i++){
      children.push(
        <div className="row" key={i}>
          <StarRatingComponent 
            name="rate2" 
            editing={false}
            starCount={5}
            value={this.state.rating[i]} />
          <div>{this.state.content[i]}</div>
        </div>
      );
    }

    return (
      <div className="col s6 m4">
        <div className="card">

          <div className="card-image">
            <img className="activator" src={this.state.image} alt="food" />
            {Auth.isUserAuthenticated() ? <AddToCollection handleCollectionChange={this.props.handleCollectionChange} dishName={this.props.dishName} collections={this.state.collections} /> : null}
          </div>

          <div className="card-content">
            <div className="card-title">
              {Auth.isUserAuthenticated() ? <a className="material-icons right modal-trigger red-text text-lighten-2" href={`#${this.props.dishName}`}>mode_edit</a> : null}
              {this.props.dishName}
            </div>

            <div id={this.props.dishName} className="modal">
              <div className="modal-content">
                <form className="input-field" onSubmit={this.handleSubmit}>
                  <label htmlFor="newName">New Dish Name</label>
                  <input id="newName" type="text" value={this.state.newName} onChange={this.handleChange} />
                  <button className="btn">Submit</button>
                </form>
              </div>
            </div>

            {ingredients}

            <div className="card-action">
              <div className="row">

                {Auth.isUserAuthenticated() ?
                  <React.Fragment>
                    <div className="row">
                      <div className="col s6">
                        <AddDishReview dishName={this.props.dishName} handleUpdateReview={this.handleUpdateReview} />
                      </div>
                      <div className="col s6">
                        <Recommend dishName={this.props.dishName} />
                      </div>
                    </div>
                  </React.Fragment>
                  : null}

                <ViewReview reviews={children} dishName={this.props.dishName} update={this.state.update} />
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