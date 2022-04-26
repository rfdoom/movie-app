import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Login(props) {

  const [credentials, setCredentials] = useState({username: '', password: ''})
  const [redirect, setRedirect] = useState(false)

  const login = event => {
    /*console.log(this.state.credentials);*/
    fetch('http://127.0.0.1:8000/auth/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(credentials)
    })
    .then(data => data.json())
    .then(
      data => {
        console.log(data.token);
        data.token ? setRedirect(true) : setRedirect(false)
      },
      
    )
    .catch(error => console.error(error))
  } 

  const register = event => {
    /*console.log(this.state.credentials);*/
    fetch('http://127.0.0.1:8000/api/users/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Authorization': 'Token e6834895032e3021fd664811cc04b02afbfc1e65'},
      body: JSON.stringify(credentials)
    })
    .then(data => data.json())
    .then(
      data => {
        console.log(data.token);
      }
    ).catch(error => {
      alert(error)
    })
  }

  const inputChanged = event => {
    const cred = credentials;
    cred[event.target.name] = event.target.value;
    setCredentials(cred);
  }

  const navigate = useNavigate()

  if (redirect) {
    return navigate('/home')
  }

  return (
    <div>
      <h1>Login User</h1>

      <label>
        Username: 
        <input 
          type="text" 
          name="username" 
          //value={credentials.username} 
          onChange={inputChanged}
        />
      </label>
      <br />
      <label>
        Password: 
        <input 
          type="password" 
          name="password" 
          //value={credentials.password} 
          onChange={inputChanged}
        />
      </label>
      <br />
      <button onClick={login}>Login</button>
      <button onClick={register}>Register</button>

    </div>
  )
  
}

export default Login;