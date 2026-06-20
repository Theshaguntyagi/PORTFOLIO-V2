import React, { useState, useEffect } from 'react';
import '../styles/VideoBackground.css';

const VideoBackground = ({ theme }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const videoSrc = theme === 'dark'
    ? `${import.meta.env.BASE_URL}moon1.mp4`
    : `${import.meta.env.BASE_URL}sun.mp4`;

  const posterSrc = theme === 'dark'
    ? `${import.meta.env.BASE_URL}moon-poster.jpg`
    : `${import.meta.env.BASE_URL}sun-poster.jpg`;

  return (
    <div className="video-background">

      {/* 🎬 BACKGROUND MEDIA */}
      {isMobile ? (
        <img
          src={posterSrc}
          alt="Atmospheric background"
          className="video-bg"
          loading="eager"
        />
      ) : (
        <video
          key={theme}
          autoPlay
          loop
          muted
          playsInline
          className="video-bg"
        >
          <source src={videoSrc} type="video/mp4" />
          <track kind="captions" src={`${import.meta.env.BASE_URL}captions.vtt`} srcLang="en" label="English" default />
        </video>
      )}

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