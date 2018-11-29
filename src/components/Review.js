import React, { Component } from 'react';
import axios from 'axios';
import M from 'materialize-css';

class Review  extends Component{
    state = {
        content : "",
        rating : ""
    }

    componentDidMount() {
        M.AutoInit();
        axios.get(`https://cs411-backend.herokuapp.com/reviews/${this.props.dishName}`)
        .then(res => {
          this.setState({
            content: res.data.map(x => x.content),
            rating: res.data.map(x=>x.rating)
          })
        })
        .catch(err => console.error(err));
    }

    createReview=()=>{
        let reviews =[]
        for (var i = 0; i < this.state.content.length; i++){
            let children = []
            children.push(
                <div className="row" key={i}>
                <div>Rating : {this.state.rating[i]}</div>
                <div>{this.state.content[i]}</div>
                </div>)
            reviews.push(children)
        }
        return reviews
    }


    render(){
        var i = 0
        return(
            <div key={i++}>
                {this.createReview()}
            </div>
        );
        

    }

}

export default Review;