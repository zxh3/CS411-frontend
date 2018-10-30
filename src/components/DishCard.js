import React from 'react';

const DishCard = (props) => {
  return (
    <div className="col s6 m3">
      <div className="card deep-orange lighten-5 blue-grey-text">
        <div className="card-image">
          <img src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?cs=srgb&dl=food-dinner-lunch-70497.jpg&fm=jpg" alt="food" />
        </div>
        
        <div className="card-content">
          <div className="right btn-floating red" onClick={() => props.handleDelete(props.dishName)}><i className="material-icons">delete</i></div>
          <span className="center">
            {props.dishName}
          </span>
        </div>
      </div>
    </div>
  );
}

export default DishCard;