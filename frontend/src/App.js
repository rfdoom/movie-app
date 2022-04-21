import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import React from 'react';
import Home from './pages/Home'
import Search from './pages/Search';

function App() {
  return (
    <div className="App">
      <Router>
        <Link to='/'><h1>WhereToWatch</h1></Link>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/search" element={<Search />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
