import React, { Component } from 'react';
import axios from 'axios';
import M from 'materialize-css';

class AddDish extends Component {
  state = {
    dishName: "",
    ingredients: "",
    dishType:""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let dishName = this.state.dishName;
    let ingredients = this.state.ingredients.split(',').map(x => x.trim());
    let dishType = this.state.dishType;

    if (dishName.length === 0 || this.state.ingredients.length === 0 || dishType.length === 0) {
      M.toast({html: 'Fields cannot be empty'});
      return;
    } else {
      axios.post('https://cs411-backend.herokuapp.com/addDish', {
        dishName,
        ingredients,
        dishType
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
      dishName: "",
      ingredients: "",
      dishType:""
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col offset-s1" style={{marginTop: '10px'}}>
            <a className="btn-floating waves-effect waves-light red lighten-2 modal-trigger" href="#modal1"><i className="material-icons">add</i></a>
          </div>
        </div>

        <div id="modal1" className="modal">
          <div className="modal-content">
            <h3 className="red-text text-lighten-2">Create a new dish!</h3>
            <div className="row">
              <form className="col s12" onSubmit={this.handleSubmit}>

                <div className="row">
                  <div className="input-field col s6">
                    <input id="dishName" type="text" onChange={this.handleChange} value={this.state.dishName} autoComplete="off" />
                    <label htmlFor="dishName">Dish Name</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s6">
                    <input id="ingredients" type="text" onChange={this.handleChange} value={this.state.ingredients} autoComplete="off" />
                    <label htmlFor="ingredients">Ingredients, separate by comma</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s6">
                    <input id="dishType" type="text" onChange={this.handleChange} value={this.state.dishType} autoComplete="off" />
                    <label htmlFor="dishType">Cusine Type</label>
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

export default AddDish;