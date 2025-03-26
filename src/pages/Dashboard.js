import React, { useState } from "react";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [transcribedText, setTranscribedText] = useState("Click Record to start speaking...");
  const [isRecording, setIsRecording] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    
    recognition.onstart = () => {
      setIsRecording(true);
      setTranscribedText("Listening...");
    };
    
    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscribedText(speechResult);
    };
    
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setTranscribedText("Error occurred. Please try again.");
    };
    
    recognition.onend = () => {
      setIsRecording(false);
    };
    
    recognition.start();
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <h2>SignifyX</h2>
        <ul className="convo-list">
          <li>Conversation 1</li>
          <li>Conversation 2</li>
          <li>Conversation 3</li>
          <li>Conversation 4</li>
          <li>Conversation 5</li>
          <li>...</li>
        </ul>
        <p className="email">abc@gmail.com</p>
        <button className="logout-btn">Logout</button>
      </aside>

      {/* Navbar */}
      <nav className="navbar">
        <div className="menu-icon" onClick={toggleSidebar}>
          ☰
        </div>
        <h1 style={{color:"white",fontFamily:"revert"}}>SignifyX</h1>
        <div>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <button className="logout-btn">Logout</button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <section className="content">
          <div className="waveform">📊 Audio Waveform
          <button onClick={startListening} className="record-btn" disabled={isRecording}>
            {isRecording ? "Listening..." : "Record Now"}
          </button>
          </div>
         
          <div className="transcribed-text">
            <p><strong>Transcribed Text:</strong> {transcribedText}</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
