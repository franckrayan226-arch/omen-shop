import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const AmbientBackground = ({ section = 'common' }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate floating particles based on section
    const particleCount = section === 'electronique' ? 15 : 8;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 200 + 100,
      duration: section === 'bienetre' ? 20 + Math.random() * 10 : 8 + Math.random() * 4,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, [section]);

  const getParticleColor = () => {
    switch (section) {
      case 'mode':
        return 'rgba(255, 59, 31, 0.08)';
      case 'bienetre':
        return 'rgba(122, 139, 92, 0.1)';
      case 'electronique':
        return 'rgba(0, 212, 255, 0.08)';
      default:
        return 'rgba(255, 59, 31, 0.05)';
    }
  };

  const getBackgroundColor = () => {
    switch (section) {
      case 'mode':
        return '#FAFAFA';
      case 'bienetre':
        return '#F5F1EA';
      case 'electronique':
        return '#0A0A0A';
      default:
        return '#FAFAFA';
    }
  };

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ backgroundColor: getBackgroundColor() }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: getParticleColor(),
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: section === 'bienetre' ? "easeInOut" : "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default AmbientBackground;