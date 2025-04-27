import React, { useRef, useEffect } from 'react';

const LandmarkPlayer = ({ landmarksSequence }) => {
  const canvasRef = useRef();

  useEffect(() => {
    if (!landmarksSequence || landmarksSequence.length === 0) return;

    const ctx = canvasRef.current.getContext('2d');
    let frameIndex = 0;

    const drawLandmarks = (landmarks) => {
      ctx.clearRect(0, 0, 640, 480);
      ctx.fillStyle = 'red';
      landmarks.forEach(point => {
        const x = point.x * 640;
        const y = point.y * 480;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();
      });
    };

    const interval = setInterval(() => {
      if (frameIndex >= landmarksSequence.length) {
        clearInterval(interval);
        return;
      }
      drawLandmarks(landmarksSequence[frameIndex]);
      frameIndex++;
    }, 100); // ~10 FPS

    return () => clearInterval(interval);
  }, [landmarksSequence]);

  return (
    <canvas ref={canvasRef} width={640} height={480} style={{ border: '1px solid black' }} />
  );
};

export default LandmarkPlayer;
