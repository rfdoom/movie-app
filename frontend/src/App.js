
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import React, { useState } from 'react'
import Home from './pages/Home'
import Search from './pages/Search'
import Login from './pages/Login'
import Random from './pages/Random'
import main from './style/main.css'

function App() {
  
  const [token, setToken] = useState('')

  const userLogin = (tok) => {
    setToken(tok)
    console.log(token)
  }
  
  return (
    <div className="App background">
      <Router>
        <Link to='/'><h1>WhatToWatch</h1></Link>
        <div className="default-links">
          <Link to="/"><h4 className='link login-link'>Login</h4></Link>
          <Link to="/search"><h4 className='link search-link'>Search</h4></Link>
          <Link to="/random"><h4 className='link random-link'>Random</h4></Link>
        </div>
        <Routes>
          <Route path="/home" element={<Home />}/>
          <Route path="/search" element={<Search />}/>
          <Route path="/" element={<Login userLogin={userLogin}/>}/>
          <Route path="/random" element={<Random />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
