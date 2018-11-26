import config from './config';
import jwt from 'jsonwebtoken';

class Auth {
  static authenticateUser(token) {
    localStorage.setItem('token', token);
  }

  static isUserAuthenticated() {
    try {
      this.decodeToken();
    } catch (err) {
      this.deauthenticateUser();
      return false;
    }
    return true;
  }

  static deauthenticateUser() {
    localStorage.removeItem('token');
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static decodeToken() {
    return jwt.verify(this.getToken(), config.jwtSecret);
  }
}

export default Auth;