import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Download, RefreshCw } from 'lucide-react';
import { getGradeColorLicence, getValidationStatusLicence } from '@/logic/logicLicence';
import { getGradeColorMaster, getValidationStatusMaster } from '@/logic/logicMaster';
import { AnnualAverageCalculator } from './AnnualAverageCalculator';
import { exportToPDF as exportResultsToPDF } from '@/utils/pdfExport';

interface Module {
  code: string;
  name: string;
  coeff: number;
  credit: number;
  has_td: boolean;
  has_tp: boolean;
  has_cc: boolean;
  has_exam: boolean;
}

interface UnitData {
  ue: string;
  type: string;
  credit: number;
  coeff: number;
  modules: Module[];
}

interface ModernGPACalculatorProps {
  semesterData: UnitData[];
  level: string;
  semester: string;
  isLicence?: boolean;
}

export const ModernGPACalculator: React.FC<ModernGPACalculatorProps> = ({
  semesterData,
  level,
  semester,
  isLicence = false
}) => {
  const [grades, setGrades] = useState<{ [key: string]: { td?: number; tp?: number; exam?: number } }>({});
  const [unitAverages, setUnitAverages] = useState<{ [key: string]: { average: number; credits: number } }>({});
  const [semesterAverage, setSemesterAverage] = useState<number>(0);
  const [totalCredits, setTotalCredits] = useState<number>(0);

  const updateGrade = (moduleCode: string, gradeType: 'td' | 'tp' | 'exam', value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value); // Auto-fill empty with 0
    setGrades(prev => ({
      ...prev,
      [moduleCode]: {
        ...prev[moduleCode],
        [gradeType]: numValue
      }
    }));
  };

  const calculateModuleAverage = (module: Module): number => {
    const moduleGrades = grades[module.code] || {};
    let cc = 0, ccCount = 0;
    
    // Handle TD and TP (if they exist) - auto-fill with 0 if empty
    if (module.has_td) {
      const tdGrade = moduleGrades.td !== undefined ? moduleGrades.td : 0;
      cc += tdGrade;
      ccCount++;
    }
    if (module.has_tp) {
      const tpGrade = moduleGrades.tp !== undefined ? moduleGrades.tp : 0;
      cc += tpGrade;
      ccCount++;
    }
    
    if (ccCount > 0) cc = cc / ccCount;
    
    // Get exam grade - auto-fill with 0 if empty
    const examGrade = moduleGrades.exam !== undefined ? moduleGrades.exam : 0;
    
    // Calculate based on system type
    if (ccCount > 0 && module.has_exam) {
      if (isLicence) {
        return (0.4 * cc) + (0.6 * examGrade); // 60% Exam, 40% CC
      } else {
        return (0.5 * cc) + (0.5 * examGrade); // 50% Exam, 50% CC
      }
    } else if (module.has_exam) {
      return examGrade;
    } else if (ccCount > 0) {
      return cc;
    }
    
    return 0; // Return 0 instead of NaN
  };

  // Recalculate everything when grades change
  useEffect(() => {
    const newUnitAverages: { [key: string]: { average: number; credits: number } } = {};
    let totalWeightedGrades = 0;
    let totalCoefficients = 0;
    let totalCreditsObtained = 0;

    semesterData.forEach(unit => {
      let unitWeightedGrades = 0;
      let unitCoefficients = 0;
      let unitCreditsObtained = 0;

      unit.modules.forEach(module => {
        const moduleAvg = calculateModuleAverage(module);
        unitWeightedGrades += moduleAvg * module.coeff;
        unitCoefficients += module.coeff;
        if (moduleAvg >= 10) {
          unitCreditsObtained += module.credit;
        }
      });

      const unitAverage = unitCoefficients > 0 ? unitWeightedGrades / unitCoefficients : 0;
      
      newUnitAverages[unit.ue] = {
        average: unitAverage,
        credits: unitAverage >= 10 ? unit.credit : unitCreditsObtained
      };

      totalWeightedGrades += unitAverage * unit.coeff;
      totalCoefficients += unit.coeff;
      totalCreditsObtained += newUnitAverages[unit.ue].credits;
    });

    const semAvg = totalCoefficients > 0 ? totalWeightedGrades / totalCoefficients : 0;
    
    setUnitAverages(newUnitAverages);
    setSemesterAverage(semAvg);
    setTotalCredits(semAvg >= 10 ? 30 : totalCreditsObtained);
  }, [grades, semesterData, isLicence]);

  const resetAll = () => {
    setGrades({});
  };

const exportToPDF = () => {
  const modules = semesterData.flatMap((unit) =>
    unit.modules.map((m) => {
      const avg = calculateModuleAverage(m);
      return {
        name: `${m.name} (${m.code})`,
        grade: avg,
        coefficient: m.coeff,
        average: avg,
      };
    })
  );

  exportResultsToPDF({
    level,
    semester,
    modules,
    semesterAverage,
    totalCredits,
  });
};

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold mb-2">{level} - {semester}</h1>
        <p className="text-muted-foreground">
          Système de calcul: {isLicence ? '60% Examen + 40% Contrôle Continu' : '50% Examen + 50% Contrôle Continu'}
        </p>
      </motion.div>

      <div className="grid gap-6">
        {semesterData.map((unit, unitIndex) => (
          <motion.div
            key={unit.ue}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: unitIndex * 0.1 }}
          >
            <Card className="overflow-hidden">
              <div className="p-6 bg-muted/50 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">{unit.type}</h3>
                    <p className="text-sm text-muted-foreground">Unité: {unit.ue}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="mb-1">
                      {unit.credit} Crédits
                    </Badge>
                    <div className="text-sm">
                      Coeff: {unit.coeff}
                    </div>
                  </div>
                </div>
                {unitAverages[unit.ue] && (
                  <div className="mt-4 p-3 bg-background rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Moyenne Unité:</span>
                      <div className="text-right">
                        <span className={`font-bold text-lg ${isLicence ? getGradeColorLicence(unitAverages[unit.ue].average) : getGradeColorMaster(unitAverages[unit.ue].average)}`}>
                          {unitAverages[unit.ue].average.toFixed(2)}/20
                        </span>
                        <div className="text-xs text-muted-foreground">
                          {isLicence ? getValidationStatusLicence(unitAverages[unit.ue].average) : getValidationStatusMaster(unitAverages[unit.ue].average)}
                        </div>
                        <div className="text-xs">
                          Crédits: {unitAverages[unit.ue].credits}/{unit.credit}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[200px]">Module</TableHead>
                      <TableHead className="w-20">Code</TableHead>
                      <TableHead className="w-20">Coeff</TableHead>
                      <TableHead className="w-20">Crédits</TableHead>
                      {unit.modules.some(m => m.has_td) && <TableHead className="w-24">Note TD</TableHead>}
                      {unit.modules.some(m => m.has_tp) && <TableHead className="w-24">Note TP</TableHead>}
                      <TableHead className="w-24">Note Exam</TableHead>
                      <TableHead className="w-24">Moyenne</TableHead>
                      <TableHead className="w-20">Crédit Obtenu</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {unit.modules.map((module) => {
                      const moduleAvg = calculateModuleAverage(module);
                      return (
                        <TableRow key={module.code}>
                          <TableCell className="font-medium">{module.name}</TableCell>
                          <TableCell className="text-center">{module.code}</TableCell>
                          <TableCell className="text-center">{module.coeff}</TableCell>
                          <TableCell className="text-center">{module.credit}</TableCell>
                          
                          {unit.modules.some(m => m.has_td) && (
                            <TableCell>
                              {module.has_td ? (
                                <Input
                                  type="number"
                                  min="0"
                                  max="20"
                                  step="0.25"
                                  placeholder="0-20"
                                  value={grades[module.code]?.td || ''}
                                  onChange={(e) => updateGrade(module.code, 'td', e.target.value)}
                                  className="w-20 text-center"
                                />
                              ) : (
                                <span className="text-muted-foreground text-center block">-</span>
                              )}
                            </TableCell>
                          )}
                          
                          {unit.modules.some(m => m.has_tp) && (
                            <TableCell>
                              {module.has_tp ? (
                                <Input
                                  type="number"
                                  min="0"
                                  max="20"
                                  step="0.25"
                                  placeholder="0-20"
                                  value={grades[module.code]?.tp || ''}
                                  onChange={(e) => updateGrade(module.code, 'tp', e.target.value)}
                                  className="w-20 text-center"
                                />
                              ) : (
                                <span className="text-muted-foreground text-center block">-</span>
                              )}
                            </TableCell>
                          )}
                          
                          <TableCell>
                            <Input
                              type="number"
                              min="0"
                              max="20"
                              step="0.25"
                              placeholder="0-20"
                              value={grades[module.code]?.exam || ''}
                              onChange={(e) => updateGrade(module.code, 'exam', e.target.value)}
                              className="w-20 text-center"
                            />
                          </TableCell>
                          
                          <TableCell className="text-center">
                            <span className={`font-semibold ${isLicence ? getGradeColorLicence(moduleAvg) : getGradeColorMaster(moduleAvg)}`}>
                              {moduleAvg.toFixed(2)}
                            </span>
                          </TableCell>
                          
                          <TableCell className="text-center">
                            {moduleAvg >= 10 ? module.credit : 0}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card Layout */}
              <div className="md:hidden space-y-4 p-4">
                {unit.modules.map((module) => {
                  const moduleAvg = calculateModuleAverage(module);
                  const creditObtained = moduleAvg >= 10 ? module.credit : 0;
                  
                  return (
                    <Card key={module.code} className="p-4 border-l-4 border-l-primary/30">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm leading-tight">{module.name}</h4>
                            <p className="text-xs text-muted-foreground">{module.code}</p>
                          </div>
                          <div className="text-right ml-2">
                            <Badge variant="outline" className="text-xs mb-1">
                              Coeff: {module.coeff}
                            </Badge>
                            <p className="text-xs text-muted-foreground">
                              {module.credit} crédits
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          {module.has_td && (
                            <div>
                              <label className="text-xs text-muted-foreground block mb-1">Note TD</label>
                              <Input
                                type="number"
                                min="0"
                                max="20"
                                step="0.25"
                                placeholder="0-20"
                                className="h-8 text-sm"
                                value={grades[module.code]?.td || ''}
                                onChange={(e) => updateGrade(module.code, 'td', e.target.value)}
                              />
                            </div>
                          )}
                          {module.has_tp && (
                            <div>
                              <label className="text-xs text-muted-foreground block mb-1">Note TP</label>
                              <Input
                                type="number"
                                min="0"
                                max="20"
                                step="0.25"
                                placeholder="0-20"
                                className="h-8 text-sm"
                                value={grades[module.code]?.tp || ''}
                                onChange={(e) => updateGrade(module.code, 'tp', e.target.value)}
                              />
                            </div>
                          )}
                          <div className={(!module.has_td && !module.has_tp) ? "col-span-2" : (module.has_td && module.has_tp) ? "col-span-2" : "col-span-1"}>
                            <label className="text-xs text-muted-foreground block mb-1">Note Examen</label>
                            <Input
                              type="number"
                              min="0"
                              max="20"
                              step="0.25"
                              placeholder="0-20"
                              className="h-8 text-sm"
                              value={grades[module.code]?.exam || ''}
                              onChange={(e) => updateGrade(module.code, 'exam', e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center pt-2 border-t">
                          <div>
                            <p className="text-xs text-muted-foreground">Moyenne</p>
                            <span className={`font-semibold text-sm ${isLicence ? getGradeColorLicence(moduleAvg) : getGradeColorMaster(moduleAvg)}`}>
                              {moduleAvg.toFixed(2)}/20
                            </span>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Crédit Obtenu</p>
                            <span className="font-semibold text-sm text-primary">
                              {creditObtained}/{module.credit}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Semester Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">Résultats du Semestre</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Moyenne Générale</p>
                <p className={`text-3xl font-bold ${isLicence ? getGradeColorLicence(semesterAverage) : getGradeColorMaster(semesterAverage)}`}>
                  {semesterAverage.toFixed(2)}/20
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Crédits Obtenus</p>
                <p className="text-3xl font-bold text-primary">
                  {totalCredits}/30
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Statut</p>
                <p className="text-lg font-semibold">
                  {isLicence ? getValidationStatusLicence(semesterAverage) : getValidationStatusMaster(semesterAverage)}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={resetAll}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Réinitialiser
        </Button>
        <Button
          onClick={exportToPDF}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Exporter PDF
        </Button>
      </div>

      {/* Annual Average Calculator - Only show for single semesters */}
      {!semester.includes('+') && (
        <AnnualAverageCalculator 
          currentAverage={semesterAverage}
          currentCredits={totalCredits}
          currentSemester={semester as 'Semestre 1' | 'Semestre 2'}
          isLicence={isLicence}
        />
      )}
    </div>
  );
};