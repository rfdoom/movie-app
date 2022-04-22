import { useRef, useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../api/AuthProvider'
import axios from '../api/Axios'

const LOGIN_URL = '/login'

function Login(props) {
  const { setAuth } = useContext(AuthContext)
  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  /* To set the focus on the first input when the component loads */
  useEffect(() => {
    userRef.current.focus();
  }, [])

  /* If the user changes the user/password, errmsg will leave */
  useEffect(() => {
    setErrMsg('');
  }, [user, password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(LOGIN_URL, 
        JSON.stringify({user, password}), 
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true
        }
      )
      console.log(JSON.stringify(response))
      /* optional chaining -- chains like '.' would, but returns 'undefined' if the chain isn't there */
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, password, roles, accessToken });
      setUser('');
      setPassword('');
      setSuccess(true);
    } catch (err) {
      
        if (!err?.response) {
          setErrMsg('No Server Response')
        }
        else if (err.response?.status === 400) {
          setErrMsg('Missing Username or Password')
        }
        else if (err.response?.status === 401) {
          setErrMsg('Unauthorized')
        }
        else {
          setErrMsg('Login failed')
        }
        errRef.current.focus()
    }
    
  }

  /* if there is a successful log in display message and link to homepage
      if there isn't one, display the login page with error message */
  return (
    <div>
      {success ? (<div><h1>You are logged in!</h1><br /><p><Link to='/'>Go to home</Link></p></div>) 
      : (
      <div>
        <div>
          <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"}>{errMsg}</p>
        </div>
        <h1>Please Log In</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username: </label>  
          <input 
            type="text" 
            name="username" 
            ref={userRef} 
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />
          <br />
          <label htmlFor="password">Password: </label>  
          <input 
            type="password" 
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <div><button type="submit">Sign In</button></div>
        </form>
        <br />
        <h3>Need an account?<span><Link to='/signup'> Sign up here</Link></span></h3>
    </div>
      )}
    </div>
  )
}

export default Login;