import React, { Component } from 'react';
import axios from 'axios';
import M from 'materialize-css';
import Auth from './Auth';

class Recommend extends Component {
  state = {
    email: "",
  }

  handleRecommend = (e) => {
    e.preventDefault();
    if (Auth.isUserAuthenticated()) {
      let token = Auth.decodeToken();
      // console.log(token.data.email);
      let email = this.state.email;
      let dishName = this.props.dishName;
      let recommender = token.data.email;
      if (this.state.email.length === 0) {
        M.toast({html: 'Fields cannot be empty'});
        return;
      } else {
        // console.log(email);
        // console.log(dishName);
        axios.post('https://cs411-backend.herokuapp.com/recommend', {
          email,
          dishName,
          recommender
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
          email: "",
      });
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render() {
    return (
        <div>

            
            <div className="btn-small modal-trigger" href={`#rec${this.props.dishName}`}>Recommend</div>                
            

            <div id={`rec${this.props.dishName}`} className="modal">
                <div className="modal-content">
                    <h3 className="red-text text-lighten-2">Recommend this dish to your friend!</h3>

                    <form className="input-field" onSubmit={this.handleRecommend}>
                      <input id="email" type="text" onChange={this.handleChange} value={this.state.email} autoComplete="off" />
                      <label htmlFor="email">Enter your friend's email here!</label>
                      <button className="btn">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
  }
}

export default Recommend;