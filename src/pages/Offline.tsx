import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { WifiOff, RotateCcw, Home, Calculator } from 'lucide-react';

export const Offline = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-muted/50">
      <motion.div
        className="max-w-md w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-8 text-center shadow-elegant">
          {/* Offline Icon with Animation */}
          <motion.div
            className="flex justify-center mb-6"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7] 
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-muted to-muted/50 rounded-full flex items-center justify-center">
              <WifiOff className="w-10 h-10 text-muted-foreground" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-2xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            You're Offline
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            It looks like you've lost your internet connection. Please check your network and try again.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button
              variant="gradient"
              size="lg"
              onClick={handleRetry}
              className="w-full ripple"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Try Again
            </Button>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => window.location.href = '/'}
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = '/calculs/l1'}
              >
                <Calculator className="w-4 h-4 mr-2" />
                Calculator
              </Button>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            className="mt-8 p-4 bg-muted/30 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h3 className="font-semibold mb-2 text-sm">Offline Features Coming Soon</h3>
            <p className="text-xs text-muted-foreground">
              We're working on offline capabilities so you can continue learning even without an internet connection.
            </p>
          </motion.div>

          {/* Footer */}
          <motion.div
            className="mt-6 text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            SmartCalc+ - Always here for your learning journey
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
};