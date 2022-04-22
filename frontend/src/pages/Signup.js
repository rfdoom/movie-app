import { useNavigate } from 'react-router-dom'
import { async } from 'regenerator-runtime'

function Signup(props) {
  const navigate = useNavigate()
  const handleSignup = async (evt) => {
    evt.preventDefault()

    let signupData = {
      username: evt.target.elements["username"].value,
      password: evt.target.elements["password"].value,
    }

    console.log("Sign up info: ", signupData)

    const data = await MovieAPI.signup(signupData)

    if (data) {
      navigate("/login")
    }
  }

  return (
    <div>
      <h2>Sign Up to Access The Content</h2>
      <hr />

      <form onSubmit={ handleSignup } method="POST">
        <label>Username: </label>
        <input type="text" name="username" placeholder="Enter username here..." />
        <br />
        <label>Password: </label>
        <input type="password" name="password" placeholder="Enter password here..." />
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default Signup