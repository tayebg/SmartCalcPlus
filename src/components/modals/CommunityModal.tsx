import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Users, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

interface CommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommunityModal = ({ isOpen, onClose }: CommunityModalProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText('Discord link coming soon!');
      setCopied(true);
      toast({
        title: "Link Copied!",
        description: "We'll share the Discord link soon.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Unable to copy link. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full mx-2 sm:mx-4 max-w-[95vw] sm:max-w-md">
        <DialogHeader className="text-center space-y-2">
          <DialogTitle className="flex items-center space-x-2 justify-center text-lg sm:text-xl font-bold">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <span>Join Our Community</span>
          </DialogTitle>
        </DialogHeader>
        
        <motion.div
          className="space-y-4 sm:space-y-6 py-2 sm:py-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">
                Community Coming Soon!
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm px-2">
                We're setting up our Discord server where you can connect with fellow students, 
                share resources, and get help with calculations.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-3 sm:p-4 rounded-lg border border-primary/20">
              <h4 className="font-medium mb-2 text-sm sm:text-base">What to Expect:</h4>
              <ul className="text-xs sm:text-sm text-muted-foreground text-left space-y-1">
                <li>• Study groups and discussion channels</li>
                <li>• Resource sharing and collaboration</li>
                <li>• Direct support from the SmartCalc+ team</li>
                <li>• Announcements about new features</li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <Button
              onClick={handleCopyLink}
              className="flex-1 text-sm sm:text-base"
              variant="gradient"
              disabled={copied}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Placeholder Link
                </>
              )}
            </Button>
            
            <Button onClick={onClose} variant="outline" className="flex-1 text-sm sm:text-base">
              Close
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};