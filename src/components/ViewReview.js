import React from 'react';

const ViewReview = (props) => {
    let reviews = <tr><td className="review">no views</td></tr>
    if (props.reviews.length > 0) {
      reviews = props.reviews.map(review => {
        return (
          <tr key={review}><td className="review">{review}</td></tr>
        );
      });
    }
    const rand = Math.floor(Math.random() * 1000);
     return (
      <div>
        <div className="btn-small modal-trigger" href={`#review${rand + props.dishName}`}>View reviews</div>
                        
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