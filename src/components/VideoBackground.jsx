import React from 'react';
import '../styles/VideoBackground.css';

const VideoBackground = ({ theme }) => {
  const videoSrc = theme === 'dark' ? '/moon.mp4' : '/sun.mp4';

  return (
    <div className="video-background">
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

      <div className="video-overlay" />
    </div>
  );
};

export default VideoBackground;
