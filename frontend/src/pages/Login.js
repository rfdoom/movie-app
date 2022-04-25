import React, { Component } from 'react'
import Axios from 'axios'

class Login extends Component {

  state = {
    credentials: {username: '', password: ''}
  }

  login = event => {
    /*console.log(this.state.credentials);*/
    fetch('http://127.0.0.1:8000/auth/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state.credentials)
    })
    .then(data => data.json())
    .then(
      data => {
        console.log(data.token);
      }
    ).catch(error => console.error(error))
  } 

  register = event => {
    /*console.log(this.state.credentials);*/
    fetch('http://127.0.0.1:8000/api/users/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Authorization': 'Token e6834895032e3021fd664811cc04b02afbfc1e65'},
      body: JSON.stringify(this.state.credentials)
    })
    .then(data => data.json())
    .then(
      data => {
        console.log(data.token);
      }
    ).catch(error => console.error(error))
  }

  inputChanged = event => {
    const cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({credentials: cred});
  }


  render() {
    return (
      <div>
        <h1>Login User</h1>

        <label>
          Username: 
          <input 
            type="text" 
            name="username" 
            value={this.state.credentials.username} 
            onChange={this.inputChanged}
          />
        </label>
        <br />
        <label>
          Password: 
          <input 
            type="password" 
            name="password" 
            value={this.state.credentials.password} 
            onChange={this.inputChanged}
          />
        </label>
        <br />
        <button onClick={this.login}>Login</button>
        <button onClick={this.register}>Register</button>

      </div>
    )
  }
}

export default Login;