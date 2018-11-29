import React, {Component} from 'react';
import axios from 'axios';
import Restaurant from './Restaurant';
import M from 'materialize-css';

class DishCardReveal extends Component {  
  state = {
    resName: ""
  }

  componentDidMount() {
    console.log(this.props);
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    let resName = this.state.resName;
    let dishName = this.props.dishName;

    if (dishName.length === 0) {
      M.toast({html: 'Fields cannot be empty'});
      return;
    } else {
      axios.post('https://cs411-backend.herokuapp.com/addDishRes', {
        resName,
        dishName
      })
        .then(res => {
          if (res.data.error) {
            console.log("error", resName, dishName);
            M.toast({html: res.data.error});
          } else {
            this.props.addRes(resName);
            M.toast({html: "Success!"});
          }
        })
        .catch(err => console.error(err));
    }
    this.setState({
      resName: "",
    });
  }
  
  render() {
    let restaurants = <div><div className="res">loading...</div></div>
    if (this.props.restaurants.length > 0) {
      restaurants = this.props.restaurants.map(restaurant => {
        return (
          <div key={restaurant}><Restaurant resName={restaurant}/></div>
        );
      });
    }
  
    return (
      <div>
        <div className="centered highlight">
          <div>
            <div className="tr">
              <div className="th" style={{textAlign:"center"}}>Restaurant</div>
            </div>
          </div>
  
          <div>
            {restaurants}
          </div>
        </div>
  

        <div className="row">
          <form className="col s12" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">mode_edit</i>
                <input className="white-text"id="resName" type="text" onChange={this.handleChange} autoComplete="off"/>
                <label htmlFor="resName">add</label>
              </div>
            </div>
          </form>
        </div>
  
      </div>
    );
  }
}

export default DishCardReveal;
//f59accd2b3f252e2923a73c917e60f35
