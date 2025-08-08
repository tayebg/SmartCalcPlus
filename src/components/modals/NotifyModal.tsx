import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Copy, Check, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NotifyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotifyModal = ({ isOpen, onClose }: NotifyModalProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('tayebekk2004@gmail.com');
      setCopied(true);
      toast({
        title: "Email copié!",
        description: "L'adresse email a été copiée dans le presse-papier.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de copier l'email. Veuillez le noter manuellement.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full mx-2 sm:mx-4 max-w-[95vw] sm:max-w-md">
        <DialogHeader className="text-center space-y-2">
          <DialogTitle className="flex items-center space-x-2 justify-center text-base sm:text-lg font-bold">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <span>Fonctionnalité en développement</span>
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
              <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">
                Cette fonctionnalité est en cours de développement
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm px-2">
                Nous travaillons actuellement sur les outils de calcul pour le doctorat. 
                Nous vous informerons dès que cette fonctionnalité sera disponible.
              </p>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                Pour être notifié des mises à jour :
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm font-mono bg-background p-2 rounded border">
                <span>tayebekk2004@gmail.com</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <Button
              onClick={handleCopyEmail}
              className="flex-1 text-sm sm:text-base"
              variant="gradient"
              disabled={copied}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copié!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copier Email
                </>
              )}
            </Button>
            
            <Button onClick={onClose} variant="outline" className="flex-1 text-sm sm:text-base">
              Fermer
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};