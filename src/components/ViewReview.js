import React from 'react';

const ViewReview = (props) => {
    let reviews = <tr><td>no views</td></tr>
    if (props.reviews.length > 0) {
      reviews = props.reviews.map(review => {
        return (
          <tr key={review}><td>{review}</td></tr>
        );
      });
    }
     return (
      <div>
        <div className="btn-small modal-trigger" href={`#review${props.dishName}`}>View reviews</div>
                        
            <div id={`review${props.dishName}`} className="modal">
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