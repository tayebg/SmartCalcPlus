import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink, FolderOpen } from 'lucide-react';

interface DriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  driveName: string;
  driveUrl: string;
}

export const DriveModal = ({ isOpen, onClose, driveName, driveUrl }: DriveModalProps) => {
  const handleOpenDrive = () => {
    window.open(driveUrl, '_blank');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full mx-2 sm:mx-4 max-w-[95vw] sm:max-w-md">
        <DialogHeader className="text-center space-y-2">
          <DialogTitle className="flex items-center space-x-2 justify-center text-base sm:text-lg font-bold">
            <FolderOpen className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <span>Ouvrir Drive</span>
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
              <FolderOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">
                {driveName}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm px-2">
                Ce lien va s'ouvrir dans un nouvel onglet pour accéder aux ressources partagées.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <Button
              onClick={handleOpenDrive}
              className="flex-1 text-sm sm:text-base"
              variant="gradient"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Ouvrir Drive
            </Button>
            
            <Button onClick={onClose} variant="outline" className="flex-1 text-sm sm:text-base">
              Annuler
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};