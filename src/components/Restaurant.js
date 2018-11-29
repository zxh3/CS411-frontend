import React, { Component } from 'react';
import axios from 'axios';
import M from 'materialize-css';
import AddResReview from './AddResReview';
import ViewReview from './ViewReview';
import StarRatingComponent from 'react-star-rating-component';
import { isEqual } from 'lodash';

class Restaurant extends Component {
  state = {
    type: "",
    address: "",
    phoneNumber: "",
    reviews: [],
    content: [],
    rating: [],
    update: 0
  }

  handleUpdateReview = () => {
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
    axios.get(`https://cs411-backend.herokuapp.com/reviews/restaurants/${this.props.resName}`)
    .then(res => {
      this.setState({
        content: res.data.map(x => x.content),
        rating: res.data.map(x=>x.rating)
      });
    })
    .catch(err => console.error(err));
  }

  componentDidMount() {
    M.AutoInit();
    axios.get(`https://cs411-backend.herokuapp.com/dishes/restaurants/${this.props.resName}`)
      .then(res => {
        this.setState({
          type: res.data.map(x => x.type),
          address: res.data.map(x => x.address),
          phoneNumber: res.data.map(x => x.phoneNumber)
        })
      })
      .catch(err => console.error(err));

    axios.get(`https://cs411-backend.herokuapp.com/reviews/restaurants/${this.props.resName}`)
      .then(res => {
        this.setState({
          content: res.data.map(x => x.content),
          rating: res.data.map(x=>x.rating)
        });
      })
      .catch(err => console.error(err));
  }


  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render() {
    let children = [];
    for (var i = 0; i < this.state.content.length; i++){
      children.push(
        <div className="row" key={i}>
          <StarRatingComponent 
          name="rate2" 
          editing={false}
          starCount={5}
          value={this.state.rating[i]}/>
          <div>{this.state.content[i]}</div>
          </div>);
    }
    const rand = Math.floor(Math.random() * 1000);
    return (
        <div>
            <div className="modal-trigger" href={`#${rand + this.props.resName}`}>
            <div className="res">{this.props.resName}</div>
            </div>
            <div id={rand + this.props.resName} className="modal fade">
            <i className="modal-close material-icons right">close</i>
            <div className="modal-content" style={{padding:0}}>
            <div>
                <form>
                    <div>
                        <b className="info">Restaurant: </b> 
                        <div className="res">{this.props.resName}</div>
                    </div>
                    <div>
                        <b className="info">Type: </b> 
                        <div className="res">{this.state.type}</div>
                    </div>
                    <div>
                        <b className="info">Address: </b> 
                        <div className="res">{this.state.address}</div>
                    </div>
                    <div>
                        <b className="info">Phone Number: </b> 
                        <div className="res">{this.state.phoneNumber}</div>
                    </div>
                </form>
            </div>
            <div className="col s6"> 
              <ViewReview reviews={children} dishName={this.props.resName} update={this.state.update}/>
            </div>
            <div className="col s6"> 
              <AddResReview className="col s5" resName={this.props.resName} handleUpdateReview={this.handleUpdateReview}/>
            </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Restaurant;
