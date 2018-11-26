import React, { Component } from 'react';
import axios from 'axios';
import M from 'materialize-css';

class Restaurant extends Component {
  state = {
    resName: this.props.resName,
    type: "",
    address: "",
    phoneNumber: ""
  }

  componentDidMount() {
    M.AutoInit();
    console.log("resName: "+ this.props.resName);
    axios.get(`https://cs411-backend.herokuapp.com/dishes/restaurants/${this.props.resName}`)
      .then(res => {
        this.setState({
          type: res.data.map(x => x.type),
          address: res.data.map(x => x.address),
          phoneNumber: res.data.map(x => x.phoneNumber)
        })
      })
      .catch(err => console.error(err));
  }

  modalChange = (e) => {
    console.log("load resName: "+ this.props.resName);
    axios.get(`https://cs411-backend.herokuapp.com/dishes/restaurants/${this.props.resName}`)
      .then(res => {
          console.log("address:" + res.data.map(x => x.address));
          this.setState.address = res.data.map(x => x.address);
        this.setState({
          type: res.data.map(x => x.type),
          address: res.data.map(x => x.address),
          phoneNumber: res.data.map(x => x.phoneNumber)
        })
      })
      .catch(err => console.error(err));
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render() {
    console.log("resN: "+ this.state.resName);
    const rand = Math.floor(Math.random() * 1000);
    return (
        <div>
            <div className="modal-trigger" href={`#${rand + this.props.resName}`}>
            <div className="res">{this.state.resName}</div>
            </div>
            <div id={rand + this.props.resName} className="modal fade">
            <div className="modal-content">
            <div>
                <form>
                    <div>
                        <b className="info">Restaurant: </b> 
                        <div className="res">{this.state.resName}</div>
                    </div>
                    <div>
                        <b className="info">Type: </b> 
                        <div className="res">{this.state.type}</div>
                    </div>
                    <div>
                        <b className="info">Address: </b> 
                        <div className="res">{this.state.address}</div>
                    </div>
                    <div>
                        <b className="info">Phone Number: </b> 
                        <div className="res">{this.state.phoneNumber}</div>
                    </div>
                </form>
            </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Restaurant;