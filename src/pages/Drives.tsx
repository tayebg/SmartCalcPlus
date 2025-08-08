import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FolderOpen, ArrowRight } from 'lucide-react';
import { drives } from '@/constants/drives';


export const Drives = () => {
  const navigate = useNavigate();
  const driveLevels = [
    'L1',
    'L2',
    'L3 ISIL',
    'L3 SI',
    'M1 SID',
    'M1 IA',
    'M1 RSI',
    'M2 SID',
    'M2 IA',
    'M2 RSI'
  ];
  const [activeLevel, setActiveLevel] = useState<string>('Tous');

  const filteredSections = drives
    .map((section) => ({
      ...section,
      items:
        activeLevel === 'Tous'
          ? section.items
          : section.items.filter((item) => item.level === activeLevel),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold mb-4">Drives</h1>
          <p className="text-xl text-muted-foreground">
            Accédez aux ressources Google Drive par niveau
          </p>
        </motion.div>

        {/* Ad */}
        {/* Ad slot (Google Ads) - disabled for now to avoid empty space */}
        {/* <AdSlot /> */}

{/* Level/Specialty Filter (matches Videos style) */}
<motion.div
  className="mb-6"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <div className="flex flex-wrap justify-center gap-2">
    {['Tous', ...driveLevels].map((lvl) => (
      <Badge
        key={lvl}
        variant={activeLevel === lvl ? 'default' : 'outline'}
        className="cursor-pointer px-4 py-2 transition-smooth hover:scale-105"
        onClick={() => setActiveLevel(lvl)}
      >
        {lvl}
      </Badge>
    ))}
  </div>
</motion.div>

{/* Years Grid (match Videos layout) */}
<motion.div
  className="grid grid-cols-1 lg:grid-cols-2 gap-8"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
          {filteredSections.map((section, index) => (
            <motion.div
              key={section.year}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              whileHover={{ y: -5 }}
            >
              <Card className="p-6 h-full group relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:scale-[1.02] border-2 border-transparent hover:border-primary/30 bg-gradient-to-br from-background to-muted/20">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-lg" />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-elegant mr-4`}>
                      <FolderOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl group-hover:text-primary transition-colors duration-300">
                        {section.year}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {section.items.length} ressources
                      </p>
                    </div>
                  </div>

                  {/* Items preview */}
                  <div className="space-y-3">
                    {section.items.slice(0, 3).map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200">
                        <div className="truncate font-medium">{item.title}</div>
                        <Button size="sm" variant="ghost" onClick={() => item.url ? window.open(item.url, '_blank') : undefined} disabled={!item.url}>
                          Ouvrir
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* Voir plus */}
                  <div className="mt-6 pt-4 border-t border-border/50">
                    <Button
                      variant="gradient"
                      className="w-full transition-smooth hover:scale-105"
                      onClick={() => navigate(`/drives/${section.year}`)}
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Voir plus
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};