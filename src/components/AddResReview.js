import React, { Component } from 'react';
import axios from 'axios';
import M from 'materialize-css';
import StarRatingComponent from 'react-star-rating-component';

class AddResReview extends Component {
  state = {
    reviewContent: "",
    resRating:0
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let resName = this.props.resName;
    let reviewContent = this.state.reviewContent;
    let resRating = this.state.resRating;
    if (this.state.reviewContent.length === 0) {
      M.toast({html: 'Fields cannot be empty'});
      return;
    } else {
      axios.post('https://cs411-backend.herokuapp.com/restaurants/addReview', {
        resName,
        reviewContent,
        resRating
      })
        .then(res => {
          if (res.data.error) {
            // console.log(res.data.error);
            M.toast({html: res.data.error});
          } else {
            M.toast({html: "Success!"});
          }
        })
        .catch(err => console.error(err));
    }
    this.setState({
        reviewContent: "",
        resRating:0
    });
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({resRating: nextValue});
  }

  render() {
    const { resRating } = this.state.resRating;
    const rand = Math.floor(Math.random() * 1000);
    return (
      <div>
        <a className="btn-small modal-trigger" href={`#add${rand + this.props.resName}`}>add review</a>

        <div id={`add${rand + this.props.resName}`} className="modal reviewRes">
          <div className="modal-content">
            <h3 className="red-text text-lighten-2" style={{fontSize:"20px", margin:"0%", marginBottom:"3%"}}>{this.props.resName}</h3>
            <div className="row">
              <form className="col s12" onSubmit={this.handleSubmit}>

                <div className="row">
                  <span className="input-field col s6" style={{margin:"0%"}}>
                    <input id="reviewContent" type="text" onChange={this.handleChange} value={this.state.reviewContent} autoComplete="off" />
                    <label htmlFor="reviewContent">start reviews</label>
                  </span>
                </div>

                <div className="row">
                  <div className="input-field col s6" style={{margin:"0%"}}>
                  <span>
                    <span className="review">Rating:{resRating}</span>
                    <StarRatingComponent 
                    name="rate1" 
                    starCount={5}
                    value={this.state.resRating}
                    onStarClick={this.onStarClick.bind(this)}
                    />
                  </span>
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

export default AddResReview;