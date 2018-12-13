import config from '../../config'
import { authHeader } from '../_helpers/auth-header'

export default class UserService {
  /**
   * check if a user is logged in
   * @returns {boolean}
   */
  static isLoggedIn () {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      return true
    }

    return false
  }

  /**
   * get the username of  the logged in user
   * @returns {*|string}
   */
  static getUsername () {
    const user = localStorage.getItem('user')
    if (user.hasOwnProperty('username')) {
      return user.username
    }
  }

  /**
   * login the  user
   * This actually makes a request  and checks whether the creds worked or not....
   * In a production env this MUST be changed
   * @param username
   * @param password
   * @returns {Promise<T | never>}
   */
  static login (username, password) {
    localStorage.setItem('user', JSON.stringify({
      authdata: btoa(username + ':' + password),
      username: username
    }))

    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': authHeader().Authorization,
        'Content-Type': 'application/json'
      }
    }

    // make a request to a  protected resource to test creds
    return fetch(`${config.apiUrl}/order`, requestOptions).then((response) => {
      if (!response.ok) {
        if (response.status === 401) {
          // auto logout if 401 response returned from api
          this.logout()
        }
        else if (response.status === 200) {

        }
      }
    })
  }

  /**
   * logout the user
   */
  static logout () {
    // remove user from local storage to log user out
    localStorage.removeItem('user')
  }
}
