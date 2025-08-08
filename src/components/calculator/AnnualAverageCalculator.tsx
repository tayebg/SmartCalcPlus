import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calculator, Trophy } from 'lucide-react';
import { calculateAnnualAverageLicence } from '@/logic/logicLicence';
import { calculateAnnualAverageMaster } from '@/logic/logicMaster';

interface AnnualCalculatorProps {
  currentAverage: number;
  currentCredits: number;
  currentSemester: 'Semestre 1' | 'Semestre 2';
  isLicence: boolean;
}

export const AnnualAverageCalculator = ({ 
  currentAverage, 
  currentCredits, 
  currentSemester,
  isLicence 
}: AnnualCalculatorProps) => {
  const [otherAverage, setOtherAverage] = useState<string>('');
  const [otherCredits, setOtherCredits] = useState<string>('30');
  const [result, setResult] = useState<any>(null);

  const calculateAnnual = () => {
    const otherAvg = parseFloat(otherAverage) || 0;
    const otherCred = parseFloat(otherCredits) || 30;
    
    const calculationFunc = isLicence ? calculateAnnualAverageLicence : calculateAnnualAverageMaster;
    
    let annualResult;
    if (currentSemester === 'Semestre 1') {
      annualResult = calculationFunc(currentAverage, currentCredits, otherAvg, otherCred);
    } else {
      annualResult = calculationFunc(otherAvg, otherCred, currentAverage, currentCredits);
    }
    
    setResult(annualResult);
  };

  const otherSemesterName = currentSemester === 'Semestre 1' ? 'Semestre 2' : 'Semestre 1';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8"
    >
      <Card className="p-6 border-2 border-secondary/30 bg-gradient-to-br from-background to-secondary/5">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold mb-2">Calcul Moyenne Annuelle</h3>
          <p className="text-muted-foreground text-sm">
            Entrez les informations du {otherSemesterName} pour calculer votre moyenne annuelle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="other-average">Moyenne {otherSemesterName}</Label>
            <Input
              id="other-average"
              type="number"
              min="0"
              max="20"
              step="0.01"
              placeholder="0.00"
              value={otherAverage}
              onChange={(e) => setOtherAverage(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="other-credits">Crédits {otherSemesterName}</Label>
            <Input
              id="other-credits"
              type="number"
              min="0"
              max="30"
              value={otherCredits}
              onChange={(e) => setOtherCredits(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <Button onClick={calculateAnnual} className="min-w-[200px]">
            <Calculator className="w-4 h-4 mr-2" />
            Calculer Moyenne Annuelle
          </Button>
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <div className="text-center p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h4 className="text-lg font-bold mb-2">Moyenne Annuelle</h4>
              <p className="text-3xl font-bold text-primary mb-2">
                {result.annualAverage}/20
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <p>S1: {result.s1Average}/20</p>
                  <p>Crédits: {result.s1Credits}</p>
                </div>
                <div>
                  <p>S2: {result.s2Average}/20</p>
                  <p>Crédits: {result.s2Credits}</p>
                </div>
              </div>
              
              {result.validated && (
                <Badge className="mt-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  🎉 30 crédits obtenus - Année validée
                </Badge>
              )}
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};