import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Calculator, RotateCcw, FileDown, Trophy } from 'lucide-react';
import { Unit } from '@/types/modules';
import { 
  calculateSemesterAverage, 
  ModuleGrade, 
  SemesterResult,
  validateGrade,
  getGradeColor,
  getValidationStatus
} from '@/logic/calculations';
import { exportToPDF as exportResultsToPDF } from '@/utils/pdfExport';

interface GPACalculatorProps {
  units: Unit[];
  level: string;
  semester: string;
}

export const GPACalculator = ({ units, level, semester }: GPACalculatorProps) => {
  const [moduleGrades, setModuleGrades] = useState<{ [key: string]: string }>({});
  const [result, setResult] = useState<SemesterResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const { toast } = useToast();

  const handleGradeChange = (moduleCode: string, value: string) => {
    setModuleGrades(prev => ({
      ...prev,
      [moduleCode]: value
    }));
  };

  const validateInputs = (): ModuleGrade[] => {
    const grades: ModuleGrade[] = [];
    const allModules = units.flatMap(unit => unit.modules);
    
    for (const module of allModules) {
      const gradeStr = moduleGrades[module.code];
      if (!gradeStr || gradeStr.trim() === '') {
        toast({
          title: "⚠️ Champ manquant",
          description: `Veuillez saisir la note pour ${module.name}`,
          variant: "destructive"
        });
        return [];
      }
      
      const grade = parseFloat(gradeStr);
      if (isNaN(grade) || !validateGrade(grade)) {
        toast({
          title: "⚠️ Note invalide",
          description: `La note pour ${module.name} doit être entre 0 et 20`,
          variant: "destructive"
        });
        return [];
      }
      
      grades.push({
        moduleCode: module.code,
        grade,
        credit: module.credit
      });
    }
    
    return grades;
  };

  const calculateGPA = async () => {
    const grades = validateInputs();
    if (grades.length === 0) return;
    
    setIsCalculating(true);
    
    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const semesterResult = calculateSemesterAverage(units, grades);
    setResult(semesterResult);
    setIsCalculating(false);
    
    toast({
      title: "✅ Calcul terminé",
      description: `Moyenne calculée: ${semesterResult.average}/20`,
      variant: "default"
    });
  };

  const resetCalculator = () => {
    setModuleGrades({});
    setResult(null);
    toast({
      title: "🔄 Calculateur réinitialisé",
      description: "Tous les champs ont été effacés",
      variant: "default"
    });
  };

const exportToPDF = () => {
  if (!result) {
    toast({
      title: "⚠️ Aucun résultat",
      description: "Veuillez d'abord calculer votre moyenne",
      variant: "destructive"
    });
    return;
  }

  const modules = units.flatMap(u => u.modules).map(m => {
    const g = parseFloat(moduleGrades[m.code] || '0') || 0;
    return {
      name: `${m.name} (${m.code})`,
      grade: g,
      coefficient: m.coeff,
      average: g
    };
  });

  exportResultsToPDF({
    level,
    semester,
    modules,
    semesterAverage: Number(result.average),
    totalCredits: Number(result.totalCredits)
  });

  toast({ title: '📄 PDF prêt', description: 'Votre relevé de notes a été généré.' });
};

  const totalModules = units.reduce((sum, unit) => sum + unit.modules.length, 0);
  const filledModules = Object.keys(moduleGrades).filter(key => moduleGrades[key]?.trim()).length;
  const progress = (filledModules / totalModules) * 100;

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-muted rounded-full h-2"
      >
        <motion.div
          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
      <p className="text-center text-sm text-muted-foreground">
        Progression: {filledModules}/{totalModules} modules
      </p>

      {/* Module Input Forms */}
      <div className="grid gap-6">
        {units.map((unit, unitIndex) => (
          <motion.div
            key={unit.ue}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: unitIndex * 0.1 }}
          >
            <Card className="p-6 border-2 border-transparent hover:border-primary/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{unit.type}</h3>
                <Badge variant="outline" className="px-3 py-1">
                  {unit.credit} crédits
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {unit.modules.map((module) => (
                  <motion.div
                    key={module.code}
                    className="space-y-2"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Label htmlFor={module.code} className="text-sm font-medium">
                      {module.name}
                      <span className="text-muted-foreground ml-1">({module.credit} crédits)</span>
                    </Label>
                    <Input
                      id={module.code}
                      type="number"
                      min="0"
                      max="20"
                      step="0.25"
                      placeholder="Note sur 20"
                      value={moduleGrades[module.code] || ''}
                      onChange={(e) => handleGradeChange(module.code, e.target.value)}
                      className="transition-all duration-200 focus:scale-105"
                    />
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={calculateGPA}
          disabled={isCalculating}
          size="lg"
          className="min-w-[200px]"
        >
          {isCalculating ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 mr-2"
            >
              <Calculator className="w-5 h-5" />
            </motion.div>
          ) : (
            <Calculator className="w-5 h-5 mr-2" />
          )}
          {isCalculating ? 'Calcul en cours...' : 'Calculer Moyenne'}
        </Button>

        <Button
          onClick={resetCalculator}
          variant="outline"
          size="lg"
          className="min-w-[200px]"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Réinitialiser tout
        </Button>

        {result && (
          <Button
            onClick={exportToPDF}
            variant="secondary"
            size="lg"
            className="min-w-[200px]"
          >
            <FileDown className="w-5 h-5 mr-2" />
            Imprimer en PDF
          </Button>
        )}
      </motion.div>

      {/* Results Display */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8 border-2 border-primary/30 bg-gradient-to-br from-background to-muted/30 shadow-glow">
              <div className="text-center mb-6">
                <Trophy className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-2">Résultats du calcul</h3>
                <p className="text-muted-foreground">
                  {level} - {semester}
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <h4 className="text-lg font-semibold">Résultats par unité:</h4>
                {result.unitResults.map((unit) => (
                  <div
                    key={unit.name}
                    className="flex justify-between items-center p-3 rounded-lg bg-muted/50"
                  >
                    <span className="font-medium">{unit.name}</span>
                    <div className="text-right">
                      <span className={`font-bold ${getGradeColor(unit.average)}`}>
                        {unit.average}/20
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {unit.totalCredits} crédits - {getValidationStatus(unit.average)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center p-6 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                <h4 className="text-xl font-bold mb-2">Moyenne générale</h4>
                <p className={`text-4xl font-bold ${getGradeColor(result.average)}`}>
                  {result.average}/20
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {result.totalCredits} crédits - {getValidationStatus(result.average)}
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};