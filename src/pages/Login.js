import React, { useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate=useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Logged In:", formData);
    navigate("/dashboard");
  };

  return (
    <section className="login">
      <h2>Welcome Back</h2>
      <p>Log in to continue using SignifyX 007.</p>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="login-button">Log In</button>
      </form>
      <p>Don't have an account? 
      <Link to="/register" 
                style={{  padding: "5px",  margin: "10px",color: "black",textDecoration: "none",backgroundColor: "rgb(220, 71, 96)",border: "2px solid black",borderRadius: "8px" }}
                >Register</Link>        </p>
      <p style={{fontSize:"20px",fontWeight:"bolder"}}><a href="/forgot-password" style={{textDecoration:"none",color:"red"}}>Forgot your password?</a></p>
    </section>
  );
};

export default Login;