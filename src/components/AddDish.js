import React, { Component } from 'react';

class AddDish extends Component {
  state = {
    dishName: "",
    restaurantName: "",
    ingredients: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
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
              <form className="col s12">

                <div className="row">
                  <div className="input-field col s6">
                    <input id="dishName" type="text" onChange={this.handleChange} value={this.state.dishName} />
                    <label htmlFor="dishName">Dish Name</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s6">
                    <input id="restaurantName" type="text" onChange={this.handleChange} value={this.state.restaurantName} />
                    <label htmlFor="restaurantName">Restaurant Name</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s6">
                    <input id="ingredients" type="text" onChange={this.handleChange} value={this.state.ingredients} />
                    <label htmlFor="ingredients">Ingredients, split by comma</label>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddDish;