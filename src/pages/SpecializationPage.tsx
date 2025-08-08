import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Calculator, TrendingUp } from 'lucide-react';
import { ModernGPACalculator } from '@/components/calculator/ModernGPACalculator';
import { modulesDataL1 } from '@/data/modules_L1';
import { modulesDataL2 } from '@/data/modules_L2';
import { modulesDataL3ISIL } from '@/data/modules_L3_ISIL';
import { modulesDataL3SI } from '@/data/modules_L3_SI';
import { modulesDataM1 } from '@/data/modules_M1';
import { modulesDataM2 } from '@/data/modules_M2';

export const SpecializationPage = () => {
  const { level, specialization } = useParams<{ level: string; specialization: string }>();
  const location = useLocation();
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);

  // Check for preselected semester from navigation state
  useEffect(() => {
    if (location.state?.preselectedSemester) {
      setSelectedSemester(location.state.preselectedSemester);
    }
  }, [location.state]);

  // Get level information
  const getLevelInfo = () => {
    switch (level) {
      case 'l1':
        return { 
          name: 'L1', 
          fullName: 'Licence 1ère année',
          semesters: ['Semestre 1', 'Semestre 2', 'Semestre 1+2'],
          isLicence: true
        };
      case 'l2':
        return { 
          name: 'L2', 
          fullName: 'Licence 2ème année',
          semesters: ['Semestre 3', 'Semestre 4', 'Semestre 3+4'],
          isLicence: true
        };
      case 'l3':
        return { 
          name: 'L3', 
          fullName: 'Licence 3ème année',
          semesters: ['Semestre 5', 'Semestre 6', 'Semestre 5+6'],
          isLicence: true
        };
      case 'm1':
        return { 
          name: 'M1', 
          fullName: 'Master 1ère année',
          semesters: ['Semestre 1', 'Semestre 2', 'Semestre 1+2'],
          isLicence: false
        };
      case 'm2':
        return { 
          name: 'M2', 
          fullName: 'Master 2ème année',
          semesters: ['Semestre 3', 'Semestre 4', 'Semestre 3+4'],
          isLicence: false
        };
      default:
        return { 
          name: level?.toUpperCase() || 'Unknown', 
          fullName: 'Niveau inconnu',
          semesters: [],
          isLicence: false
        };
    }
  };

  // Get modules based on level and specialization
  const getModules = (levelKey: string, specializationKey: string, semester: number | string) => {
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
      } else if (levelKey === 'l3') {
        sem1 = sem1Raw === 5 ? 1 : 2;
        sem2 = sem2Raw === 6 ? 2 : 1;
      } else if (levelKey === 'm2') {
        sem1 = sem1Raw; // M2 uses 3,4 directly
        sem2 = sem2Raw;
      } else {
        sem1 = sem1Raw;
        sem2 = sem2Raw;
      }
      
      const data1 = getModules(levelKey, specializationKey, sem1);
      const data2 = getModules(levelKey, specializationKey, sem2);
      return [...data1, ...data2];
    }
    
    // Map display semester to data key for single semesters
    if (levelKey === 'l1') {
      semesterKey = semester; // L1 uses 1,2 directly
    } else if (levelKey === 'l2') {
      semesterKey = semester === 3 ? 1 : semester === 4 ? 2 : semester;
    } else if (levelKey === 'l3') {
      semesterKey = semester === 5 ? 1 : semester === 6 ? 2 : semester;
    } else if (levelKey === 'm2') {
      semesterKey = semester; // M2 uses actual semester numbers
    }
    
    // Handle L1-L3 levels
    if (levelKey === 'l1') {
      moduleData = modulesDataL1.L1;
    } else if (levelKey === 'l2') {
      moduleData = modulesDataL2.L2;
    } else if (levelKey === 'l3' && specializationKey === 'ISIL') {
      moduleData = modulesDataL3ISIL.L3ISIL;
    } else if (levelKey === 'l3' && specializationKey === 'SI') {
      moduleData = modulesDataL3SI.L3SI;
    } else if (levelKey === 'm1') {
      moduleData = modulesDataM1[specializationKey as keyof typeof modulesDataM1];
    } else if (levelKey === 'm2') {
      moduleData = modulesDataM2[specializationKey as keyof typeof modulesDataM2];
    }
    
    if (!moduleData) {
      console.log('No module data found for:', levelKey, specializationKey, semester);
      return [];
    }
    
    const result = moduleData[semesterKey as number] || [];
    console.log('Module data result for semesterKey', semesterKey, ':', result);
    return result;
  };

  const levelInfo = getLevelInfo();
  const displayLevel = `${levelInfo.name} ${specialization}`;

  // Reset states when level changes
  const resetStates = () => {
    setSelectedSemester(null);
  };

  // Show calculator interface
  if (selectedSemester) {
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
    
    const semesterData = getModules(level!, specialization!, semesterIdentifier);
    
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
            level={displayLevel}
            semester={selectedSemester}
            isLicence={levelInfo.isLicence}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div className="mb-8" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link to={`/calculs/${level?.includes('l') ? 'licence' : 'master'}/${level}`}>
            <Button variant="ghost" className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Retour au niveau
            </Button>
          </Link>
        </motion.div>

        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-4">{levelInfo.fullName} - {specialization}</h1>
          <p className="text-xl text-muted-foreground">
            Sélectionnez votre semestre pour commencer les calculs
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {levelInfo.semesters.map((semester, index) => (
            <motion.div
              key={semester}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                setSelectedSemester(semester);
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
};