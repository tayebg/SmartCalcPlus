import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { CommunityModal } from '@/components/modals/CommunityModal';

export const Community = () => {
  const [showModal, setShowModal] = useState(false);

  const handleJoinCommunity = () => {
    setShowModal(true);
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-12 border-2 border-primary/20 bg-gradient-to-br from-background to-muted/30 hover:shadow-glow transition-all duration-500">
            <div className="text-6xl mb-6">👥</div>
            
            <h1 className="text-3xl font-bold mb-4">Join Our Community!</h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with fellow LMD students, share knowledge, and get help with your calculations. 
              Our Discord community is launching soon!
            </p>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleJoinCommunity}
                variant="gradient"
                size="lg"
                className="shadow-elegant hover:shadow-glow transition-all duration-300"
              >
                <Users className="w-5 h-5 mr-2" />
                Join Community
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </div>
      
      <CommunityModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};