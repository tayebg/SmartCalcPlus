import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calculator, BookOpen } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomeModal = ({ isOpen, onClose }: WelcomeModalProps) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-full mx-2 sm:mx-4 max-w-[95vw] sm:max-w-md">
        <DialogHeader className="text-center space-y-2">
          <DialogTitle className="text-xl sm:text-2xl font-bold">Welcome to SmartCalc+!</DialogTitle>
        </DialogHeader>
        <motion.div 
          className="text-center space-y-4 sm:space-y-6 py-2 sm:py-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-4xl sm:text-6xl mb-2 sm:mb-4">🎓</div>
          <p className="text-muted-foreground text-base sm:text-lg px-2">
            Start exploring SmartCalc+ tools for your academic success!
          </p>
          <div className="flex flex-col gap-3 mt-4 sm:mt-6">
            <Button 
              onClick={() => handleNavigate('/calculs')}
              variant="gradient"
              size="lg"
              className="w-full py-3 text-sm sm:text-base transition-smooth hover:scale-105"
            >
              <Calculator className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Go to Calculations
            </Button>
            <Button 
              onClick={() => handleNavigate('/notes')}
              variant="outline"
              size="lg"
              className="w-full py-3 text-sm sm:text-base transition-smooth hover:scale-105"
            >
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              View Notes
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};