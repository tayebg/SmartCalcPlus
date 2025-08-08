import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Video, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TutorialsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TutorialsModal = ({ isOpen, onClose }: TutorialsModalProps) => {
  const { toast } = useToast();

  const handleNotifyMe = async () => {
    try {
      await navigator.clipboard.writeText('tayebekk2004@gmail.com');
      toast({
        title: "Email Copied!",
        description: "We'll notify you when tutorials are ready.",
      });
      onClose();
    } catch (err) {
      toast({
        title: "Error",
        description: "Unable to copy email. Please note it manually.",
        variant: "destructive"
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-background border border-border rounded-lg max-w-md w-full p-6 shadow-2xl"
      >
        <div className="text-center">
          <div className="text-4xl mb-4">🎬</div>
          <h2 className="text-2xl font-bold mb-4">Coming Soon...</h2>
          <p className="text-muted-foreground mb-6">
            We're preparing a full video library with detailed explanations for SmartCalc+. Stay tuned!
          </p>
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </motion.div>
    </div>
  );
};