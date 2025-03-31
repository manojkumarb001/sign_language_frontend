// src/pages/Home.js
import React from "react";
import "../styles/Home.css";
import About from "./About";
import Feature from "./Feature";
import COntact from "./COntact";
// import Navbar from "../components/Navbar";

const Home = () => (
  <div>    

  <section className="home">
    <div className="hero">
      <h1>Welcome to SignifyX 007</h1>
      <p>Breaking barriers with AI-powered Speech-to-Sign Language Translation.</p>
      <button className="cta-button">Get Started</button>
    </div>
    
    <div className="features">
      <h2>Why Choose SignifyX 007?</h2>
      <div className="feature-list">
        <div className="feature-item">
          <h3>Real-Time Translation</h3>
          <p>Convert speech and text into sign language instantly.</p>
        </div>
        <div className="feature-item">
          <h3>AI-Powered Prediction</h3>
          <p>Enhances communication with smart sentence predictions.</p>
        </div>
        <div className="feature-item">
          <h3>User-Friendly Interface</h3>
          <p>Designed for easy accessibility and smooth interactions.</p>
        </div>
      </div>
    </div>

    <div className="interactive-section">
      <h2>Experience SignifyX in Action</h2>
      <p>Try out our interactive demo to see how AI-powered sign language conversion works.</p>
      <div className="demo-box">
        <input type="text" placeholder="Type something..." className="demo-input" />
        <button className="demo-button">Translate</button>
      </div>
    </div>
    <About/>
     <Feature/>
    <COntact/>
  </section></div>
);

export default Home;