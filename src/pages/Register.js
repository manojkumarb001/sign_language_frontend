import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess(data.message);
                setFormData({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError("Registration failed. Try again later.");
        }
    };

    return (
        <section className="register">
            <h2>Create an Account</h2>
            <p>Join SignifyX 007 today and start experiencing AI-powered communication.</p>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <form onSubmit={handleSubmit} className="register-form">
                <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
                <button type="submit" className="register-button">Sign Up</button>
            </form>

            <p>Already have an account? 
                <Link to="/login" className="login-link"
                                style={{  padding: "5px",  margin: "10px",color: "black",textDecoration: "none",backgroundColor: "rgb(220, 71, 96)",border: "2px solid black",borderRadius: "8px" }}

                >Login</Link>
            </p>
        </section>
    );
};

export default Register;
