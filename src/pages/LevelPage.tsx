import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Calculator, TrendingUp } from 'lucide-react';
import { NotifyModal } from '@/components/modals/NotifyModal';
import { GPACalculator } from '@/components/calculator/GPACalculator';
import { AnnualCalculator } from '@/components/calculator/AnnualCalculator';
import { ModernGPACalculator } from '@/components/calculator/ModernGPACalculator';

// Import module data
import { modulesDataL1 } from '@/data/modules_L1';
import { modulesDataL2 } from '@/data/modules_L2';

export const LevelPage = () => {
  const { level } = useParams<{ level: string }>();
  const navigate = useNavigate();
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState<string | null>(null);

  // Get level information
  const getLevelInfo = () => {
    switch (level) {
      case 'l1':
        return { 
          name: 'L1', 
          fullName: 'Licence 1ère année',
          semesters: ['Semestre 1', 'Semestre 2', 'Semestre 1+2'],
          specializations: null
        };
      case 'l2':
        return { 
          name: 'L2', 
          fullName: 'Licence 2ème année',
          semesters: ['Semestre 3', 'Semestre 4', 'Semestre 3+4'],
          specializations: null
        };
      case 'l3':
        return { 
          name: 'L3', 
          fullName: 'Licence 3ème année',
          semesters: ['Semestre 5', 'Semestre 6', 'Semestre 5+6'],
          specializations: ['ISIL', 'SI']
        };
      case 'm1':
        return { 
          name: 'M1', 
          fullName: 'Master 1ère année',
          semesters: ['Semestre 1', 'Semestre 2', 'Semestre 1+2'],
          specializations: ['IA', 'SID', 'RSID']
        };
      case 'm2':
        return { 
          name: 'M2', 
          fullName: 'Master 2ème année',
          semesters: ['Semestre 3', 'Semestre 4', 'Semestre 3+4'],
          specializations: ['IA', 'SID', 'RSID']
        };
      case 'doctorat':
        return { 
          name: 'Doctorat', 
          fullName: 'Études doctorales',
          semesters: null,
          specializations: null
        };
      default:
        return { 
          name: level?.toUpperCase() || 'Unknown', 
          fullName: 'Niveau inconnu',
          semesters: [],
          specializations: null
        };
    }
  };

  // Get modules based on level and semester for direct access (L1/L2)
  const getModules = (levelKey: string, semester: number | string) => {
    let moduleData;
    let semesterKey = semester;
    
    // Handle combined semesters
    if (typeof semester === 'string' && semester.includes('+')) {
      const semNumbers = semester.split('+').map(s => parseInt(s.replace('Semestre ', '')));
      let [sem1Raw, sem2Raw] = semNumbers;
      
      // Map actual semester numbers to data structure indices
      let sem1, sem2;
      if (levelKey === 'l1') {
        sem1 = sem1Raw; // L1 uses 1,2 directly
        sem2 = sem2Raw;
      } else if (levelKey === 'l2') {
        sem1 = sem1Raw === 3 ? 1 : 2;
        sem2 = sem2Raw === 4 ? 2 : 1;
      } else {
        sem1 = sem1Raw;
        sem2 = sem2Raw;
      }
      
      const data1 = getModules(levelKey, sem1);
      const data2 = getModules(levelKey, sem2);
      return [...data1, ...data2];
    }
    
    // Map display semester to data key for single semesters
    if (levelKey === 'l1') {
      semesterKey = semester; // L1 uses 1,2 directly
    } else if (levelKey === 'l2') {
      semesterKey = semester === 3 ? 1 : semester === 4 ? 2 : semester;
    }
    
    // Handle L1-L2 levels
    if (levelKey === 'l1') {
      moduleData = modulesDataL1.L1;
    } else if (levelKey === 'l2') {
      moduleData = modulesDataL2.L2;
    }
    
    if (!moduleData) {
      console.log('No module data found for:', levelKey, semester);
      return [];
    }
    
    const result = moduleData[semesterKey as number] || [];
    console.log('Module data result for L1/L2 semesterKey', semesterKey, ':', result);
    return result;
  };

  const levelInfo = getLevelInfo();

  // Reset states when level changes
  const resetStates = () => {
    setSelectedSemester(null);
    setSelectedSpecialization(null);
  };

  // Updated flow: Show specialization selection first for L3 and M1/M2
  if (levelInfo.specializations && !selectedSpecialization) {
    return (
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div className="mb-8" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link to="/calculs">
              <Button variant="ghost" className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Retour aux calculs
              </Button>
            </Link>
          </motion.div>

          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold mb-4">{levelInfo.fullName}</h1>
            <p className="text-xl text-muted-foreground">Choisissez votre spécialisation</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {levelInfo.specializations.map((spec, index) => (
              <motion.div
                key={spec}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedSpecialization(spec)}
              >
                <Card className="p-8 text-center cursor-pointer border-2 border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-glow">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{spec}</h3>
                  <p className="text-muted-foreground">Spécialisation {spec}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show semester selection after specialization is selected
  if (selectedSpecialization) {
    return (
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div className="mb-8" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Button onClick={resetStates} variant="ghost" className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Retour aux spécialisations
            </Button>
          </motion.div>

          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold mb-4">{levelInfo.fullName} - {selectedSpecialization}</h1>
            <p className="text-xl text-muted-foreground">Sélectionnez votre semestre</p>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {levelInfo.semesters?.filter(s => s !== 'Semestre 1+2').map((semester, index) => (
              <motion.div
                key={semester}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Navigate to specialization page using React Router
                  navigate(`/calculs/${level?.includes('l') ? 'licence' : 'master'}/${level}/${selectedSpecialization}`, {
                    state: { preselectedSemester: semester }
                  });
                }}
              >
                <Card className="p-8 text-center cursor-pointer border-2 border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-glow">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                    <Calculator className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{semester}</h3>
                  <p className="text-muted-foreground">Calculer votre moyenne</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    );
  }
  
  // Show calculator interface for L1/L2 when semester is selected
  if (selectedSemester && !levelInfo.specializations) {
    let semesterIdentifier: number | string;
    
    if (selectedSemester.includes('+')) {
      semesterIdentifier = selectedSemester;
    } else {
      const semesterMap: { [key: string]: number } = {
        'Semestre 1': 1,
        'Semestre 2': 2,
        'Semestre 3': 3,
        'Semestre 4': 4,
        'Semestre 5': 5,
        'Semestre 6': 6
      };
      semesterIdentifier = semesterMap[selectedSemester] || 1;
    }
    
    const semesterData = getModules(level!, semesterIdentifier);
    
    return (
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div className="mb-8" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Button onClick={resetStates} variant="ghost" className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Retour aux semestres
            </Button>
          </motion.div>
          
          <ModernGPACalculator 
            semesterData={semesterData}
            level={levelInfo.fullName}
            semester={selectedSemester}
            isLicence={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div className="mb-8" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/calculs">
            <Button variant="ghost" className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Retour aux calculs
            </Button>
          </Link>
        </motion.div>

        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-4">{levelInfo.fullName}</h1>
          <p className="text-xl text-muted-foreground">
            Sélectionnez votre semestre pour commencer les calculs
          </p>
        </motion.div>

        {level === 'doctorat' ? (
          <motion.div className="max-w-3xl mx-auto text-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="p-12 border-2 border-primary/20 bg-gradient-to-br from-background to-muted/30 hover:shadow-glow transition-all duration-500">
              <div className="text-6xl mb-6">🎓</div>
              <h2 className="text-3xl font-bold mb-4">Calculation UI Coming Soon...</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Here will be the interface for GPA calculation tables and advanced calculation tools for doctoral programs.
                Stay tuned for powerful mathematical solutions tailored to your academic level.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <Button 
                   variant="gradient" 
                   size="lg" 
                   className="shadow-elegant hover:shadow-glow transition-all duration-300"
                   onClick={() => setShowNotifyModal(true)}
                 >
                   <BookOpen className="w-5 h-5 mr-2" />
                   Notify Me When Ready
                 </Button>
                <Button variant="outline" size="lg" className="transition-all duration-300 hover:shadow-elegant hover:border-primary/50">
                  <Calculator className="w-5 h-5 mr-2" />
                  View Documentation
                </Button>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {levelInfo.semesters?.map((semester, index) => (
              <motion.div
                key={semester}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedSemester(semester)}
              >
                <Card className="p-8 text-center cursor-pointer border-2 border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-glow">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                    {semester === 'Semestre 1+2' ? (
                      <TrendingUp className="w-8 h-8 text-white" />
                    ) : (
                      <Calculator className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{semester}</h3>
                  <p className="text-muted-foreground">
                    {semester === 'Semestre 1+2' ? 'Calculer moyenne annuelle' : 'Calculer votre moyenne'}
                  </p>
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