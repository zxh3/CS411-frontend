import React, { Component } from 'react';
import axios from 'axios';
import M from 'materialize-css';
import Auth from './Auth';
import { isEqual } from 'lodash';

class ViewRecommend  extends Component{
    state = {
        email: "",
        // recommendations: [],
        recommenders:[],
        dishNames:[]
    }

    componentDidMount() {
        M.AutoInit();
        if (Auth.isUserAuthenticated()) {
            let token = Auth.decodeToken();
            console.log(token.data.email);
 
            axios.get(`https://cs411-backend.herokuapp.com/recommend/${token.data.email}`)
            .then(res => {
                this.setState({
                    email:token.data.email,
                    recommenders: res.data.map(x => x.recommender),
                    dishNames: res.data.map(x => x.dishname)
                  });
            })
            .catch(err => console.error(err));
        }
    }


    getRecommendations = (e) =>  {
        console.log(this.state.email);
        axios.get(`https://cs411-backend.herokuapp.com/recommend/${this.state.email}`)
        .then(res => {
          this.setState({
            recommenders: res.data.map(x => x.recommender),
            dishNames: res.data.map(x => x.dishname)
          });
        }).catch(err => console.error(err));
    }

    render(){
        let recommendations = [];
        for (var i = 0; i < this.state.dishNames.length; i++){
            recommendations.push(
            <div className="row" key={i}>
                <span>Recommend By:</span> 
                <span className="recommender">{this.state.recommenders[i]}</span>
                <div className="dishrec">{this.state.dishNames[i]}</div>
                </div>);
        }
        let recommends = <tr><td className="recommend">no recommendations</td></tr>
        console.log("recommends:" + recommendations);
        if (recommendations.length > 0) {
          recommends = recommendations.map(recommend => {
            return (
              <tr key={recommend + Math.random()}><td className="recommend">{recommend}</td></tr>
            );
          });
        }
        const rand = Math.floor(Math.random() * 1000);
        i = 0;
        return(
            
            <div key={i++}>
            <div>
            <div className="btn-small modal-trigger right" href={`#recommend${rand + this.state.email}`} onClick={this.getRecommendations}>View recommendations</div>
                            
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
            </div>
        );
        

    }

}

export default ViewRecommend;