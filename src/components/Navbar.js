import React from "react";
import { Link } from "react-router-dom";
import '../App.css'
const Navbar = () => (
    <nav className="navbar">
        <h2>SignifyX 007</h2>
        <div style={{
            marginRight:"5%"
        }}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/features">Features</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/register" style={{ backgroundColor: "green", padding: "10px",border:"2px solid black"  }}>Register/Login</Link>
        </div>
    </nav>
);

export default Navbar;