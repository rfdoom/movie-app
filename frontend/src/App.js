
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import React, { useState } from 'react'
import Home from './pages/Home'
import Search from './pages/Search'
import Login from './pages/Login'
import movieNight from './img/movieNight.png'

function App() {
  
  const [token, setToken] = useState('')

  const userLogin = (tok) => {
    setToken(tok)
    console.log(token)
  }

  return (
    <div className="App">
      <div style={{
        backgroundImage: "url(" + "https://hdclipartall.com/images/free-movie-night-clipart-movie-night-clipart-1271_1150.png" + ")",
        width: '1300px',
        height: '1300px'
      }}>
      </div>
      <Router>
        <Link to='/'><h1>WhereToWatch</h1></Link>
        <div className="default-links">
          <Link to="/"><h4>Login</h4></Link>
          <Link to="/search"><h4>Search</h4></Link>
        </div>
        <Routes>
          <Route path="/home" element={<Home />}/>
          <Route path="/search" element={<Search />}/>
          <Route path="/" element={<Login userLogin={userLogin}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
