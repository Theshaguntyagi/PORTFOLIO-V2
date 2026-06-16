import React from 'react';
import '../styles/VideoBackground.css';

const VideoBackground = ({ theme }) => {
  const videoSrc = theme === 'dark'
  ? `${import.meta.env.BASE_URL}moon1.mp4`
  : `${import.meta.env.BASE_URL}sun.mp4`;

  return (
    <div className="video-background">

      {/* 🎬 VIDEO */}
      <video
        key={theme}
        autoPlay
        loop
        muted
        playsInline
        className="video-bg"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* 🎨 COLOR GRADE */}
      <div className="video-gradient" />

      {/* 🌫️ DEPTH / FOG */}
      <div className="video-fog" />

      {/* 🔲 DARKEN FOR UI CONTRAST */}
      <div className="video-overlay" />

    </div>
  );
};

export default VideoBackground;