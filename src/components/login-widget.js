import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {getUser, storeUser, deleteUser} from '../auth.js';
import {BASE_URL} from '../config.js';

/**
 * LoginWidget <login-widget>
 * Present a login form and handle user authentication, if a user
 * is logged in, display their name and a logout button
 */
class LoginWidget extends LitElement {
  static properties = {
    _loginUrl: {type: String, state: true},
    _user: {type: String, state: true},
    _errorMessage: {type: String, state: true},
  };

  static styles = css`
    :host {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    align-items: center; 
    }

    p {
      color: #1f2833;
    }

    form{
      display: flex;
      flex: row;

      font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
      padding: 0.5rem;
      border-color: #66fcf1;
    border-radius: 6px;
    color: white;
    background-color: #1f2833;
    
    font-size: 15px;
    }
    
    
    button {
      font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
      padding: 0.5rem;
      border-color: #66fcf1;
    border-radius: 6px;
    cursor: pointer;
    color: #1f2833;
    background-color: #66fcf1;
    margin-left: 35px;
    font-size: 15px;
    }

    button:hover{
      color: #66fcf1;
      background-color: #1f2833;
    }

    input[type="submit"] {
      font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
      padding: 0.5rem;
      border-color: #66fcf1;
    border-radius: 6px;
    cursor: pointer;
    color: #1f2833;
    background-color: #66fcf1;
    margin-left: 35px;
    font-size: 15px;
    }

    input[type="submit"]:hover{
      color: #66fcf1;
      background-color: #1f2833;
    }
    `;

  constructor() {
    super();
    this._loginUrl = `${BASE_URL}users/login`;
    const user = getUser();
    if (user) {
      this._user = user;
    }
  }

  _submitForm(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    fetch(this._loginUrl, {
      method: 'post',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type': 'application/json'},
    }).then((result) => result.json()).then((response) => {
      if (response.error) {
        this._errorMessage = response.error;
      } else {
        this._user = response;
        storeUser(response);
      }
    });
  }

  _logout() {
    deleteUser();
    this._user = null;
  }

  render() {
    if (this._user) {
      return html`<p>Logged in as ${this._user.name}</p>
              <button @click=${this._logout}>Logout</button>
              <div>
                
              </div>`;
    }
    return html`
      <p>${this._errorMessage}</p>
      <form @submit=${this._submitForm}>
          Username: <input name="username">
          Password: <input type="password" name="password">
          <input type='submit' value='Login'>
      </form>`;
  }
}

customElements.define('login-widget', LoginWidget);
