import { motion } from 'framer-motion';

interface Particle {
  id: number;
  size: number;
  delay: number;
  duration: number;
  x: string;
  y: string;
}

export const AnimatedParticles = () => {
  const particles: Particle[] = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    delay: Math.random() * 4,
    duration: Math.random() * 3 + 4,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-60"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.x,
            top: particle.y,
            background: `radial-gradient(circle, hsl(var(--primary) / 0.8), hsl(var(--secondary) / 0.4))`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -15, 0],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Larger accent particles */}
      {Array.from({ length: 4 }, (_, i) => (
        <motion.div
          key={`accent-${i}`}
          className="absolute rounded-full"
          style={{
            width: 12,
            height: 12,
            left: `${20 + i * 20}%`,
            top: `${30 + (i % 2) * 40}%`,
            background: `hsl(var(--primary) / 0.6)`,
            boxShadow: `0 0 20px hsl(var(--primary) / 0.4)`,
          }}
          animate={{
            y: [0, -50, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 6 + i,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};