import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calculator, BookOpen, Video, MapPin, Users, Zap, Shield, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { WelcomeModal } from '@/components/modals/WelcomeModal';
import { TutorialsModal } from '@/components/modals/TutorialsModal';
// import AdBanner from '@/components/AdBanner'; // Temporarily disabled (AdSense approval pending)

import { Link } from "react-router-dom";
import { Calculator, BookOpen, Video, MapPin } from "lucide-react";

const features = [
  {
    icon: Calculator,
    title: (
      <Link to="/calculs" className="hover:text-primary transition-smooth">
        Calculations
      </Link>
    ),
    description: 'Advanced calculation tools for all academic levels',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: BookOpen,
    title: 'Rich Library',
    description: 'Comprehensive collection of educational resources',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Video,
    title: (
      <Link to="/videos" className="hover:text-primary transition-smooth">
        Videos
      </Link>
    ),
    description: 'Interactive learning through visual content',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: MapPin,
    title: (
      <Link to="/roadmap" className="hover:text-primary transition-smooth">
        Roadmap
      </Link>
    ),
    description: 'Structured path to academic excellence',
    color: 'from-orange-500 to-orange-600',
  },
];

const stats = [
  { value: '50K+', label: 'Students', icon: Users },
  { value: '99.9%', label: 'Uptime', icon: Zap },
  { value: '100%', label: 'Secure', icon: Shield },
  { value: '4.9/5', label: 'Rating', icon: Star },
];


export const Home = () => {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showTutorialsModal, setShowTutorialsModal] = useState(false);
  const [showStartJourneyModal, setShowStartJourneyModal] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.h1
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Smart Calculations
              <br />
              <span className="text-4xl md:text-6xl">Made Simple</span>
            </motion.h1>
            
            <motion.p
              className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              The ultimate platform for academic calculations, resources, and learning.
              Designed for students, by students.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button 
                variant="gradient" 
                size="xl"
                onClick={() => navigate('/calculs')}
              >
                Start Calculating
                <Calculator className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="xl" 
                onClick={() => setShowTutorialsModal(true)}
              >
                Watch Tutorials
                <Video className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive platform designed to make your academic journey smoother and more efficient.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="p-6 h-full bg-gradient-to-br from-card to-card/50 border-border/50 hover:shadow-elegant transition-smooth">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of students who are already using SmartCalc+ to excel in their studies.
            </p>
            
            <Button 
              variant="gradient" 
              size="xl"
              onClick={() => setShowStartJourneyModal(true)}
            >
              Start Your Journey
              <Zap className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>

      </section>

      {/* Ads disabled (pending AdSense approval)
      <div className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <AdBanner />
        </div>
      </div>
      */}

      {/* Modals */}
      <WelcomeModal
        isOpen={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
      />
      
      <TutorialsModal
        isOpen={showTutorialsModal}
        onClose={() => setShowTutorialsModal(false)}
      />
      
      {/* Start Journey Modal */}
      {showStartJourneyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-background border border-border rounded-lg max-w-md w-full p-6 shadow-2xl"
          >
            <div className="text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h2 className="text-2xl font-bold mb-4">Coming Soon...</h2>
              <p className="text-muted-foreground mb-6">
                The SmartCalc+ journey tutorials will soon be available to guide you through all features. Stay tuned!
              </p>
              <Button onClick={() => setShowStartJourneyModal(false)} className="w-full">
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
