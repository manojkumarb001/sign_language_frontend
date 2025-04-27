import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Hands } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';

const SignLanguageConverter = () => {
  const videoRef = useRef(null);
  const [word, setWord] = useState('');
  const [recording, setRecording] = useState(false);
  const [landmarksData, setLandmarksData] = useState([]);
  const [animationUrl, setAnimationUrl] = useState('');

  let recorder;
  let chunks = [];

  const startRecording = async () => {
    if (!word) {
      alert('Please enter a word before recording!');
      return;
    }

    setRecording(true);
    setLandmarksData([]);

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    // after setting srcObject…
videoRef.current.srcObject = stream;
videoRef.current.play()
  .catch(err => {
    // Chrome  —  “AbortError: The play() request was interrupted…”
    console.warn("video.play() interrupted:", err);
  });


    recorder = new MediaRecorder(stream);
    chunks = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.push(e.data);
      }
    };

    recorder.start();

    const hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    hands.onResults((results) => {
      if (results.multiHandLandmarks.length > 0) {
        const frameLandmarks = results.multiHandLandmarks.map(hand =>
          hand.map(lm => ({ x: lm.x, y: lm.y, z: lm.z }))
        );
        setLandmarksData(prev => [...prev, frameLandmarks]);
      } else {
        setLandmarksData(prev => [...prev, []]);
      }
    });

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await hands.send({ image: videoRef.current });
      },
      width: 640,
      height: 480,
    });
    camera.start();

    // Stop recording after 3 seconds
    setTimeout(async () => {
      recorder.stop();
      stream.getTracks().forEach(track => track.stop());
      setRecording(false);

      // Send video and landmarks to backend
      const blob = new Blob(chunks, { type: 'video/mp4' });
      const landmarksBlob = new Blob([JSON.stringify(landmarksData)], { type: 'application/json' });

      const formData = new FormData();
      formData.append('word', word);
      formData.append('video', blob, `${word}.mp4`);
      formData.append('landmarks', landmarksBlob, `${word}_landmarks.json`);

      try {
        const res = await axios.post('http://localhost:5000/upload', formData);
        alert(res.data.message);
      } catch (err) {
        console.error(err);
        alert('Failed to upload sign data.');
      }

    }, 3000);
  };

  const playAnimation = async () => {
    if (!word) {
      alert('Enter a word first!');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/play/${word}`, {
        responseType: 'blob',
      });
      const url = URL.createObjectURL(response.data);
      setAnimationUrl(url);
    } catch (error) {
      console.error(error);
      alert('Failed to generate animation.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>✋ Sign Language Recorder</h1>

      <input
        type="text"
        placeholder="Enter Word"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        style={{ padding: '8px', marginBottom: '10px', width: '300px' }}
      />
      <br />

      <video ref={videoRef} style={{ width: '500px', height: 'auto', marginBottom: '20px' }} />

      <div>
        {!recording ? (
          <button onClick={startRecording} style={{ padding: '10px 20px', marginRight: '10px' }}>
            Start Recording
          </button>
        ) : (
          <button disabled style={{ padding: '10px 20px', marginRight: '10px' }}>
            Recording...
          </button>
        )}
        <button onClick={playAnimation} style={{ padding: '10px 20px' }}>
          Play Animation
        </button>
      </div>

      {animationUrl && (
        <div style={{ marginTop: '30px' }}>
          <h2>Animation Preview</h2>
          <video src={animationUrl} controls width="500" />
        </div>
      )}
    </div>
  );
};

export default SignLanguageConverter;
