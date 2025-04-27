import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Feature from "./pages/Feature";
import "./App.css";
import COntact from "./pages/COntact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SignLanguageConverter from "./pages/SignLanguageConverter";


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Feature />} />
        <Route path="/contact" element={<COntact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/sign-converter" element={<SignLanguageConverter/>} />

      </Routes>
    </>
  );
};

export default App;