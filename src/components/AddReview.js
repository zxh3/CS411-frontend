import React, { Component } from 'react';
import axios from 'axios';
import M from 'materialize-css';
import StarRatingComponent from 'react-star-rating-component';

class AddReview extends Component {
  state = {
    reviewContent: "",
    dishRating:0
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let dishName = this.props.dishName;
    let reviewContent = this.state.reviewContent;
    let dishRating = this.state.dishRating;

    if (this.state.reviewContent.length === 0) {
      M.toast({html: 'Fields cannot be empty'});
      return;
    } else {
      axios.post('https://cs411-backend.herokuapp.com/dishes/addReview', {
        dishName,
        reviewContent,
        dishRating
      })
        .then(res => {
          if (res.data.error) {
            console.log(res.data.error);
            M.toast({html: res.data.error});
          } else {
            M.toast({html: "Success!"});
          }
        })
        .catch(err => console.error(err));
    }
    this.setState({
        reviewContent: "",
        dishRating:0
    });
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({dishRating: nextValue});
  }

  render() {
    const { dishRating } = this.state.dishRating;
    const rand = Math.floor(Math.random() * 1000);
    return (
      <div>
        <a className="btn-small wave-effect wave-light modal-trigger" href={`#${rand + this.props.dishName}`}>add review</a>

        <div id={rand + this.props.dishName} className="modal">
          <div className="modal-content">
            <h3 className="red-text text-lighten-2">{this.props.dishName}</h3>
            <div className="row">
              <form className="col s12" onSubmit={this.handleSubmit}>

                <div className="row">
                  <div className="input-field col s6">
                    <input id="reviewContent" type="text" onChange={this.handleChange} value={this.state.reviewContent} autoComplete="off" />
                    <label htmlFor="reviewContent">content</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s6">
                  <div>
                    <p>Rating: {dishRating}</p>
                    <StarRatingComponent 
                    name="rate1" 
                    starCount={5}
                    value={this.state.dishRating}
                    onStarClick={this.onStarClick.bind(this)}
                    />
                  </div>
                  </div>
                </div>

                <button className="btn red lighten-2">Submit</button>

              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddReview;