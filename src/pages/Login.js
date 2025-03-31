import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";
import Navbar from "../components/Navbar";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/login", formData);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Try again.");
    }
  };

  return (
    <div>
      <Navbar />


      <section className="login">
        <h2>Welcome Back</h2>
        <p>Log in to continue using SignifyX 007.</p>

        {error && <p className="error-msg">{error}</p>}

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

        <p>
          Don't have an account?{" "}
          <Link to="/register" className="register-link"
            style={{ padding: "5px", margin: "10px", color: "black", textDecoration: "none", backgroundColor: "rgb(220, 71, 96)", border: "2px solid black", borderRadius: "8px" }}
          >Register</Link>
        </p>
        <p className="forgot-password">
          <Link to="/forgot-password"
            style={{ color: "rgb(230, 239, 172)" }}>Forgot your password?</Link>
        </p>
      </section></div>
  );
};

export default Login;
