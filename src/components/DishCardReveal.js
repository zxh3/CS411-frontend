import React from 'react';

const DishCardReveal = (props) => {
  let restaurants = <tr><td>loading...</td></tr>
  if (props.restaurants.length > 0) {
    restaurants = props.restaurants.map(restaurant => {
      return (
        <tr key={restaurant}><td>{restaurant}</td></tr>
      );
    });
  }

  return (
    <div>
      <table className="centered highlight">
        <thead>
          <tr>
            <th>Restaurant</th>
          </tr>
        </thead>

        <tbody>
          {restaurants}
        </tbody>
      </table>

      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">mode_edit</i>
              <input id="icon_prefix" type="text" autoComplete="off"/>
              <label htmlFor="icon_prefix">add</label>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
}

export default DishCardReveal;