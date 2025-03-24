import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Feature from "./pages/Feature";
import "./App.css";
import COntact from "./pages/COntact";
import Register from "./pages/Register";
import Login from "./pages/Login";


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Feature />} />
        <Route path="/contact" element={<COntact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </>
  );
};

export default App;