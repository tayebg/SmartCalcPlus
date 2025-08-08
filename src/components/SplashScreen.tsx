import { motion, AnimatePresence } from 'framer-motion';
import { Calculator } from 'lucide-react';
import { AnimatedParticles } from './AnimatedParticles';

interface SplashScreenProps {
  isVisible: boolean;
  onComplete: () => void;
}

export const SplashScreen = ({ isVisible, onComplete }: SplashScreenProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(270deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--primary)))",
            backgroundSize: "300% 300%",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={() => {
            if (!isVisible) onComplete();
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            opacity: { duration: 0.5 },
            backgroundPosition: {
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {/* Animated Particles */}
          <AnimatedParticles />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/20" />
          <div className="text-center">
            {/* Logo with animations */}
            <motion.div
              className="relative mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 1,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
            >
              {/* Spinning circle background */}
              <motion.div
                className="absolute inset-0 w-24 h-24 mx-auto rounded-full border-4 border-primary/20 border-t-primary"
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Logo container with enhanced glow */}
              <motion.div
                className="relative w-24 h-24 mx-auto bg-white/90 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20"
                animate={{ 
                  boxShadow: [
                    "0 0 30px rgba(255, 255, 255, 0.3), 0 0 60px hsl(var(--primary) / 0.2)",
                    "0 0 60px rgba(255, 255, 255, 0.6), 0 0 120px hsl(var(--primary) / 0.4)",
                    "0 0 30px rgba(255, 255, 255, 0.3), 0 0 60px hsl(var(--primary) / 0.2)"
                  ],
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Calculator className="w-12 h-12 text-primary" />
                </motion.div>
                
                {/* Orbital rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white/30"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-2 rounded-full border border-white/20"
                  animate={{ rotate: [360, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </motion.div>

            {/* Brand name */}
            <motion.h1
              className="text-4xl font-bold text-white mb-4 drop-shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              SmartCalc+
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="text-white/90 text-lg drop-shadow-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Smart calculations for brilliant minds
            </motion.p>

            {/* Loading dots */}
            <motion.div
              className="flex justify-center space-x-2 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-3 h-3 bg-white rounded-full shadow-glow"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6],
                    y: [0, -8, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};