import React, { Component } from 'react';
import axios from 'axios';
import M from 'materialize-css';
import AddResReview from './AddResReview';
import ViewReview from './ViewReview';
import StarRatingComponent from 'react-star-rating-component';

class Restaurant extends Component {
  state = {
    type: "",
    address: "",
    phoneNumber: "",
    reviews: [],
    content: [],
    rating: []
  }

  componentDidMount() {
    M.AutoInit();
    // console.log("resName: "+ this.props.resName);
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

  render() {
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
              <ViewReview reviews={this.state.reviews} dishName={this.props.resName}/>
            </div>
            <div className="col s6"> 
              <AddResReview className="col s5" resName={this.props.resName}/>
            </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Restaurant;