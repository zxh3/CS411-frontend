import React, { Component } from 'react';
import axios from 'axios';
import M from 'materialize-css';
import Auth from './Auth';

class ViewRecommend  extends Component{
    state = {
        email: "",
        recommendations: [],
    }

    componentDidMount() {
        M.AutoInit();
        if (Auth.isUserAuthenticated()) {
            let token = Auth.decodeToken();
            console.log(token.data.email);
 
            axios.get(`https://cs411-backend.herokuapp.com/recommend/${token.data.email}`)
            .then(res => {
                let dishNames = res.data.map(x=>x.dishname);
                let recommenders =res.data.map(x=>x.recommender);
                console.log(dishNames);
                for (var i = 0; i < dishNames.length; i++){
                    let children = []
                    children.push(
                    <div className="row" key={i}>
                        <span>Recommend By:</span> 
                        <span className="recommender">{recommenders[i]}</span>
                        <div className="dishrec">{dishNames[i]}</div>
                        </div>)
                    this.setState(state => ({
                    email:token.data.email,
                    recommendations: [...state.recommendations, children]
                    }))
                }
            })
            .catch(err => console.error(err));
        }
    }

    ViewRecommend = (props) => {
        let recommends = <tr><td className="recommend">no recommendations</td></tr>
        console.log("recommends:" + this.state.recommendations);
        if (this.state.recommendations.length > 0) {
          recommends = this.state.recommendations.map(recommend => {
            return (
              <tr key={recommend + Math.random()}><td className="recommend">{recommend}</td></tr>
            );
          });
        }
        const rand = Math.floor(Math.random() * 1000);
         return (
          <div>
            <div className="btn-small modal-trigger right" href={`#recommend${rand + this.state.email}`}>View recommendations</div>
                            
                <div id={`recommend${rand + this.state.email}`} className="modal reviewRes">
                <table className="centered highlight">
                    <thead>
                    <tr> 
                    <th>Recommendations</th>
                    </tr>
                    </thead>
                    <tbody>
                      {recommends}
                    </tbody>
                </table>
                </div>
        </div>
        );
    }


    render(){
        var i = 0
        return(
            
            <div key={i++}>
                {this.ViewRecommend()}
            </div>
        );
        

    }

}

export default ViewRecommend;