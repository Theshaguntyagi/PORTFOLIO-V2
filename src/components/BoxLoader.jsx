import React, { useState, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';

const BoxLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 40;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #0f1419 0%, #1a1f3a 50%, #0f1419 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        overflow: 'hidden',
        fontFamily: '"Outfit", "Inter", sans-serif',
      }}
      onAnimationComplete={() => {
        setTimeout(onComplete, 800);
      }}
    >
      {/* Animated gradient background elements */}
      <Motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '600px',
          height: '600px',
          marginTop: '-300px',
          marginLeft: '-300px',
          background: 'radial-gradient(circle, rgba(100, 180, 255, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          zIndex: 0,
        }}
      />

      {/* Secondary gradient orb */}
      <Motion.div
        animate={{
          rotate: -360,
          scale: [1, 0.9, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          bottom: '-200px',
          right: '-200px',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(100, 180, 255, 0.06) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          zIndex: 0,
        }}
      />

      {/* Main content */}
      <Motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '48px',
          textAlign: 'center',
        }}
      >
        {/* Premium Logo/Icon Animation */}
        <Motion.div
          variants={itemVariants}
          style={{
            position: 'relative',
            width: '120px',
            height: '120px',
          }}
        >
          {/* Outer rotating ring */}
          <Motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              inset: 0,
              border: '2px solid',
              borderColor: 'transparent rgba(100, 180, 255, 0.3) transparent transparent',
              borderRadius: '50%',
            }}
          />

          {/* Middle pulsing ring */}
          <Motion.div
            animate={{
              rotate: -360,
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              inset: '15px',
              border: '1.5px solid rgba(100, 180, 255, 0.4)',
              borderRadius: '50%',
            }}
          />

          {/* Inner glowing square */}
          <Motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: '30px',
              background: 'linear-gradient(135deg, rgba(100, 180, 255, 0.2), rgba(80, 140, 255, 0.1))',
              borderRadius: '8px',
              border: '1px solid rgba(100, 180, 255, 0.5)',
              boxShadow: '0 0 20px rgba(100, 180, 255, 0.3), inset 0 0 20px rgba(100, 180, 255, 0.1)',
            }}
          />

          {/* Center dot */}
          <Motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'rgb(100, 180, 255)',
              boxShadow: '0 0 12px rgba(100, 180, 255, 0.8), 0 0 24px rgba(100, 180, 255, 0.4)',
            }}
          />
        </Motion.div>

        {/* Heading */}
        <Motion.div variants={itemVariants}>
          <h1
            style={{
              margin: '0 0 8px 0',
              fontSize: '32px',
              fontWeight: '600',
              letterSpacing: '-0.5px',
              background: 'linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Loading
          </h1>
          <p
            style={{
              margin: '0',
              fontSize: '14px',
              color: 'rgba(100, 180, 255, 0.7)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              fontWeight: '500',
            }}
          >
            Please wait
          </p>
        </Motion.div>

        {/* Animated status indicator */}
        <Motion.div
          variants={itemVariants}
          style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          {[0, 1, 2].map((i) => (
            <Motion.div
              key={i}
              animate={{
                height: ['4px', '20px', '4px'],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
              style={{
                width: '3px',
                borderRadius: '2px',
                background: 'linear-gradient(180deg, rgba(100, 180, 255, 0.4), rgba(100, 180, 255, 0.8))',
                boxShadow: '0 0 8px rgba(100, 180, 255, 0.5)',
              }}
            />
          ))}
        </Motion.div>

        {/* Progress bar with percentage */}
        <Motion.div
          variants={itemVariants}
          style={{
            width: '280px',
          }}
        >
          <div
            style={{
              position: 'relative',
              height: '3px',
              background: 'rgba(100, 180, 255, 0.1)',
              borderRadius: '2px',
              overflow: 'hidden',
              marginBottom: '12px',
            }}
          >
            <Motion.div
              animate={{
                width: `${Math.min(progress, 95)}%`,
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(100, 180, 255, 0.9), transparent)',
                boxShadow: '0 0 12px rgba(100, 180, 255, 0.6)',
              }}
            />
          </div>
          <p
            style={{
              margin: '0',
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.5)',
              letterSpacing: '0.05em',
            }}
          >
            {Math.round(progress)}%
          </p>
        </Motion.div>
      </Motion.div>
    </Motion.div>
  );
};

export default BoxLoader;