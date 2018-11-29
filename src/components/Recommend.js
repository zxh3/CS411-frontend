import React, { Component } from 'react';
import axios from 'axios';

class Recommend extends Component {

  handleRecommend = (e) => {
    e.preventDefault();
    console.log(`RRRRRRRRRRRRRRRRRecommending ${this.props.dishName} to ${e}`);
    axios.post('https://cs411-backend.herokuapp.com/recommend', {
     user_email: e,
      dishName: this.props.dishName
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render() {
    return (
        <div>

            <div className="recommendbtn">
            <div className="btn-small modal-trigger" href="#modal-recommend">Recommend</div>                
            </div>

            <div id="modal-recommend" className="modal">
                <div className="modal-content">
                    <h3 className="red-text text-lighten-2">Recommend this dish to your friend!</h3>

                    <form className="input-field" onSubmit={this.handleRecommend}>
                        <input id="user_email" type="text" onChange={this.handleChange}/>
                        <label htmlFor="user_email">Enter your friend's email here!</label>
                        <button className="btn">Submit</button>
                    </form>
                    
                </div>
            </div>

        </div>
    );
  }
}

export default Recommend;