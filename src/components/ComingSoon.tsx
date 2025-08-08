import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import { NotifyModal } from './modals/NotifyModal';
import { useState } from 'react';

interface ComingSoonProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export const ComingSoon = ({ title, description, icon }: ComingSoonProps) => {
  const [showNotifyModal, setShowNotifyModal] = useState(false);

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-12 border-2 border-primary/20 bg-gradient-to-br from-background to-muted/30 hover:shadow-glow transition-all duration-500">
            <div className="text-6xl mb-6">
              {icon || '🚀'}
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {description}
            </p>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setShowNotifyModal(true)}
                variant="gradient"
                size="lg"
                className="shadow-elegant hover:shadow-glow transition-all duration-300"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Notify Me When Ready
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </div>
      
      <NotifyModal
        isOpen={showNotifyModal}
        onClose={() => setShowNotifyModal(false)}
      />
    </div>
  );
};