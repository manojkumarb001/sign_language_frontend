import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [transcribedText, setTranscribedText] = useState("Click 'Record' to start speaking...");
  const [signLanguageText, setSignLanguageText] = useState("Sign language translation will appear here...");
  const [isRecording, setIsRecording] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const recognitionRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:5000/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data.user))
        .catch(() => {
          localStorage.removeItem("token");
          navigate("/login");
        });
    }
  }, [navigate]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition. Please use Google Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsRecording(true);
      setTranscribedText("Listening...");
      setSignLanguageText("Translating...");
    };

    recognition.onresult = (event) => {
      const speechResult = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(" ");
      setTranscribedText(speechResult);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(async () => {
        try {
          const response = await axios.post(
            "http://localhost:5000/record_speech",
            { text: speechResult },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
          );

          setSignLanguageText(response.data.sign_translation || "Sign translation unavailable.");
        } catch (error) {
          console.error("Error saving transcribed text:", error);
          setSignLanguageText("Error processing sign language.");
        }
      }, 3000);
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
      setIsRecording(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="menu-icon" onClick={toggleSidebar}>☰</div>
        <h1>SignifyX</h1>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`} onClick={() => setIsSidebarOpen(false)}>
        <h2>SignifyX</h2>
        <ul>
          <li>Conversation 1</li>
          <li>Conversation 2</li>
          <li>Conversation 3</li>
          <li>Conversation 4</li>
          <li>Conversation 5</li>
        </ul>
        <p>{user?.email}</p>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <section className="content">
          <button onClick={startListening} className="record-btn" disabled={isRecording}>
            🎤 Start Recording
          </button>
          <button onClick={stopListening} className="stop-btn" disabled={!isRecording}>
            ⏹ Stop Recording
          </button>

          <div className="text-display">
            <p><strong>Transcribed Text:</strong> {transcribedText}</p>
            <p><strong>Sign Language Translation:</strong> {signLanguageText}</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
