import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calculator, GraduationCap, BookOpen, Trophy } from 'lucide-react';
import { NotifyModal } from '@/components/modals/NotifyModal';

const cycles = [
  {
    id: 'licence',
    name: 'Licence',
    description: 'L1, L2, L3',
    icon: BookOpen,
    color: 'from-green-500 to-emerald-600',
    levels: [
      { id: 'l1', name: 'L1', path: '/calculs/licence/l1' },
      { id: 'l2', name: 'L2', path: '/calculs/licence/l2' },
      { id: 'l3', name: 'L3', path: '/calculs/licence/l3' },
    ]
  },
  {
    id: 'master',
    name: 'Master',
    description: 'M1, M2',
    icon: GraduationCap,
    color: 'from-blue-500 to-purple-600',
    levels: [
      { id: 'm1', name: 'M1', path: '/calculs/master/m1' },
      { id: 'm2', name: 'M2', path: '/calculs/master/m2' },
    ]
  },
  {
    id: 'ingenieurs',
    name: 'Ingénieurs',
    description: 'Engineering Programs',
    icon: Calculator,
    color: 'from-cyan-500 to-blue-600',
    levels: [
      { id: 'ingenieurs', name: 'Ingénieurs', path: '/calculs/ingenieurs' },
    ]
  },
];

export const Calculations = () => {
  const [selectedCycle, setSelectedCycle] = useState<string | null>(null);
  const [showNotifyModal, setShowNotifyModal] = useState(false);

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold mb-4">Smart Calculations</h1>
          <p className="text-xl text-muted-foreground">
            Choose your academic level and start calculating
          </p>
        </motion.div>

        {selectedCycle ? (
          selectedCycle === 'doctorat' || selectedCycle === 'ingenieurs' ? (
            /* Doctorat & Ingénieurs Direct Message */
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center mb-8">
                <motion.button
                  onClick={() => setSelectedCycle(null)}
                  className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
                  whileHover={{ scale: 1.05, x: -5 }}
                >
                  ← Back to Cycles
                </motion.button>
              </div>

              <Card className="p-12 border-2 border-primary/20 bg-gradient-to-br from-background to-muted/30 hover:shadow-glow transition-all duration-500">
                <div className="text-6xl mb-6">
                  {selectedCycle === 'doctorat' ? '🎓' : '🔧'}
                </div>
                
                <h2 className="text-3xl font-bold mb-4">Calculation UI Coming Soon...</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  {selectedCycle === 'doctorat' 
                    ? 'Here will be the interface for GPA calculation tables and advanced calculation tools for doctoral programs. Stay tuned for powerful mathematical solutions tailored to your academic level.'
                    : 'We\'re preparing tools tailored to engineering programs. Stay tuned for powerful features.'
                  }
                </p>
                
                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                   
                   <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                     <Button
                       variant="outline"
                       size="lg"
                       className="transition-all duration-300 hover:shadow-elegant hover:border-primary/50"
                       asChild
                     >
                       <Link to="/notes">
                         <Calculator className="w-5 h-5 mr-2" />
                         View Documentation
                       </Link>
                     </Button>
                   </motion.div>
                 </div>
              </Card>
            </motion.div>
          ) : (
            /* Level Selection */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={() => setSelectedCycle(null)}
                  className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
                >
                  ← Back to Cycles
                </button>
                <h2 className="text-2xl font-semibold">
                  {cycles.find(c => c.id === selectedCycle)?.name} Levels
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cycles.find(c => c.id === selectedCycle)?.levels.map((level, index) => (
                  <motion.div
                    key={level.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to={level.path}>
                      <Card className="p-8 text-center cursor-pointer border-2 border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-glow">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                          <Calculator className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{level.name}</h3>
                        <p className="text-muted-foreground">Access calculation tools</p>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
        ) : (
          /* Cycle Selection */
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {cycles.map((cycle, index) => (
              <motion.div
                key={cycle.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCycle(cycle.id)}
              >
                <Card className="p-8 cursor-pointer relative overflow-hidden border-2 border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-glow">
                  {/* Gradient Border Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${cycle.color} opacity-0 hover:opacity-10 transition-opacity duration-300 rounded-lg`} />
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-r ${cycle.color} flex items-center justify-center shadow-elegant`}>
                      <cycle.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-center mb-3">{cycle.name}</h3>
                    <p className="text-center text-muted-foreground mb-4">{cycle.description}</p>
                    
                    <div className="flex justify-center">
                      <Badge variant="outline" className="px-4 py-1">
                        {cycle.levels.length} Level{cycle.levels.length > 1 ? 's' : ''}
                      </Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      
      <NotifyModal
        isOpen={showNotifyModal}
        onClose={() => setShowNotifyModal(false)}
      />
    </div>
  );
};