import '../CSS/Home.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <img src={logo} alt="Logo" className="home-logo" />
      <h1 className="home-heading">PEBBLE BANK</h1>
      <p className="home-text">Welcome to Pebble Bank <br />“Small steps. Big trust.”</p>
      <div className="button-container">
        <button className="home-button" onClick={() => navigate('/Login')}>Get Started</button>
      </div>
    </div>
  );
}

export default Home;
