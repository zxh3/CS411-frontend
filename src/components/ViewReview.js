import React from 'react';

const ViewReview = (props) => {
    let reviews = <tr><td className="review">no views</td></tr>
    if (props.reviews.length > 0) {
      reviews = props.reviews.map(review => {
        return (
          <tr key={review + props.dishName + Math.random()}><td className="review">{review}</td></tr>
        );
      });
    }
    const rand = Math.floor(Math.random() * 1000);
     return (
      <div>
        <div style={{backgroundColor: 'rgba(238,110,115,0.95)'}} className="btn-floating modal-trigger" href={`#review${rand + props.dishName}`}><i className="material-icons">comment</i></div>
            <div id={`review${rand + props.dishName}`} className="modal reviewRes">
            <table className="centered highlight">
                <thead>
                <tr> 
                <th>Reviews</th>
                </tr>
                </thead>
                <tbody>
                  {reviews}
                </tbody>
            </table>
            </div>
    </div>
    );
  }

export default ViewReview;
