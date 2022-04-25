
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import React, { useState } from 'react'
import Home from './pages/Home'
import Search from './pages/Search'
import Login from './pages/Login'
import Movies from './pages/Movies';

function App() {
  
  const [token, setToken] = useState('')

  const userLogin = (tok) => {
    setToken(tok)
    console.log(token)
  }

  return (
    <div className="App">
      <Router>
        <Link to='/'><h1>WhereToWatch</h1></Link>
        <div className="default-links">
          <Link to="/login"><h4>Login</h4></Link>
          <Link to="/search"><h4>Search</h4></Link>
        </div>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/search" element={<Search />}/>
          <Route path="/login" element={<Login userLogin={userLogin}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
