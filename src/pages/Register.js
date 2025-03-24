import React, { useState } from "react";
import "../styles/Register.css";
import { Link } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        console.log("User Registered:", formData);
    };

    return (
        <section className="register">
            <h2>Create an Account</h2>
            <p>Join SignifyX 007 today and start experiencing AI-powered communication.</p>
            <form onSubmit={handleSubmit} className="register-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
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
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="register-button">Sign Up</button>
            </form>
            <p>Already have an account ?               
                <Link to="/login" 
                style={{  padding: "5px",  margin: "10px",color: "black",textDecoration: "none",backgroundColor: "rgb(220, 71, 96)",border: "2px solid black",borderRadius: "8px" }}
                >Login</Link>
            </p>
        </section>
    );
};

export default Register;