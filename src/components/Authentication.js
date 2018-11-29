import React, { Component } from 'react';
import Auth from './Auth';
import jwt from 'jsonwebtoken';
import config from './config';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

const loginResponse = (response, handle) => {
  // TODO: add user to database if it's the first time login
  console.log('response::');
  console.log(response);
  
  if (response.error) {
    handle();
    return;
  }

  let { name, email, imageUrl } = response.profileObj;
  console.log(name);
  console.log(email);
  console.log(imageUrl);

  const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (12 * 60 * 60), // expire after 12 hours
    data: {
      name,
      email,
      imageUrl
    }
  }, config.jwtSecret);
  Auth.authenticateUser(token);
  axios.post(`https://cs411-backend.herokuapp.com/user/`, {
    name,
    email,
    imageUrl
  }).then(res => {
    console.log(res.data);
    handle();
  }).catch(err => console.error(err));
}

const logout = (handle) => {
  console.log('[logoutResponse] called')
  Auth.deauthenticateUser();
  handle();
}

class Authentication extends Component {
  render() {
    let thumbnail = null;
    if (Auth.isUserAuthenticated()) {
      let token = Auth.decodeToken();
      let { name, imageUrl } = token.data;
      thumbnail = (
        <div className="row">
          <img src={imageUrl} alt="" className="col s3 circle"/>
          <span className="col s2">{name}</span>
          <button className="right btn-floating red" onClick={() => logout(this.props.handleAuth)}><i className="material-icons">close</i></button>
        </div>
      );
    }

    return (
      <div className="right" style={{marginTop: '10px', marginRight: '10px'}}>
        {thumbnail}

        {Auth.isUserAuthenticated() ? 
          null
          :
          <GoogleLogin
            clientId="1084995042542-k3p6cah91sk289dkkir6li03v52mj924.apps.googleusercontent.com"
            render={renderProps => (
              <button className="btn-floating green" onClick={renderProps.onClick}><i className="material-icons">check</i></button>
            )}
            buttonText="Login"
            onSuccess={(response) => loginResponse(response, this.props.handleAuth)}
            onFailure={(response) => loginResponse(response, this.props.handleAuth)}
          />
        }
      </div>
    );
  }
}

export default Authentication;