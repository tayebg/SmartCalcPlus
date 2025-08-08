import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Calculator, RotateCcw, FileDown, TrendingUp } from 'lucide-react';
import { 
  calculateAnnualAverage, 
  AnnualResult,
  validateGrade,
  getGradeColor,
  getValidationStatus
} from '@/logic/calculations';

export const AnnualCalculator = () => {
  const [s1Average, setS1Average] = useState('');
  const [s1Credits, setS1Credits] = useState('');
  const [s2Average, setS2Average] = useState('');
  const [s2Credits, setS2Credits] = useState('');
  const [result, setResult] = useState<AnnualResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const { toast } = useToast();

  const validateInputs = () => {
    const s1Avg = parseFloat(s1Average);
    const s1Cred = parseInt(s1Credits);
    const s2Avg = parseFloat(s2Average);
    const s2Cred = parseInt(s2Credits);

    if (isNaN(s1Avg) || !validateGrade(s1Avg)) {
      toast({
        title: "⚠️ Moyenne S1 invalide",
        description: "La moyenne du semestre 1 doit être entre 0 et 20",
        variant: "destructive"
      });
      return null;
    }

    if (isNaN(s1Cred) || s1Cred <= 0 || s1Cred > 60) {
      toast({
        title: "⚠️ Crédits S1 invalides",
        description: "Les crédits du semestre 1 doivent être entre 1 et 60",
        variant: "destructive"
      });
      return null;
    }

    if (isNaN(s2Avg) || !validateGrade(s2Avg)) {
      toast({
        title: "⚠️ Moyenne S2 invalide",
        description: "La moyenne du semestre 2 doit être entre 0 et 20",
        variant: "destructive"
      });
      return null;
    }

    if (isNaN(s2Cred) || s2Cred <= 0 || s2Cred > 60) {
      toast({
        title: "⚠️ Crédits S2 invalides",
        description: "Les crédits du semestre 2 doivent être entre 1 et 60",
        variant: "destructive"
      });
      return null;
    }

    return { s1Avg, s1Cred, s2Avg, s2Cred };
  };

  const calculateAnnual = async () => {
    const inputs = validateInputs();
    if (!inputs) return;

    setIsCalculating(true);
    
    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const annualResult = calculateAnnualAverage(
      inputs.s1Avg, 
      inputs.s1Cred, 
      inputs.s2Avg, 
      inputs.s2Cred
    );
    
    setResult(annualResult);
    setIsCalculating(false);
    
    toast({
      title: "✅ Calcul terminé",
      description: `Moyenne annuelle: ${annualResult.annualAverage}/20`,
      variant: "default"
    });
  };

  const resetCalculator = () => {
    setS1Average('');
    setS1Credits('');
    setS2Average('');
    setS2Credits('');
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
        description: "Veuillez d'abord calculer votre moyenne annuelle",
        variant: "destructive"
      });
      return;
    }
    
    const content = `
SmartCalc+ - Calcul Moyenne Annuelle
===================================

Date: ${new Date().toLocaleDateString('fr-FR')}

Détails du calcul:
Semestre 1: ${result.s1Average}/20 (${result.s1Credits} crédits)
Semestre 2: ${result.s2Average}/20 (${result.s2Credits} crédits)

Formule appliquée:
((${result.s1Average} × ${result.s1Credits}) + (${result.s2Average} × ${result.s2Credits})) / ${result.totalCredits}

Résultat:
Moyenne annuelle: ${result.annualAverage}/20
Crédits totaux: ${result.totalCredits}
Statut: ${getValidationStatus(result.annualAverage)}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SmartCalc_Moyenne_Annuelle_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "📄 Export réussi",
      description: "Votre calcul a été exporté",
      variant: "default"
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Calcul Moyenne Annuelle</h2>
        <p className="text-muted-foreground">
          Calculez votre moyenne annuelle en utilisant les moyennes et crédits de chaque semestre
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-8 border-2 border-transparent hover:border-primary/20 transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Semestre 1 */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-center mb-4">Semestre 1</h3>
              
              <div className="space-y-2">
                <Label htmlFor="s1-average">Moyenne Semestre 1</Label>
                <Input
                  id="s1-average"
                  type="number"
                  min="0"
                  max="20"
                  step="0.01"
                  placeholder="Ex: 14.5"
                  value={s1Average}
                  onChange={(e) => setS1Average(e.target.value)}
                  className="transition-all duration-200 focus:scale-105"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="s1-credits">Crédits Semestre 1</Label>
                <Input
                  id="s1-credits"
                  type="number"
                  min="1"
                  max="60"
                  placeholder="Ex: 30"
                  value={s1Credits}
                  onChange={(e) => setS1Credits(e.target.value)}
                  className="transition-all duration-200 focus:scale-105"
                />
              </div>
            </div>

            {/* Semestre 2 */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-center mb-4">Semestre 2</h3>
              
              <div className="space-y-2">
                <Label htmlFor="s2-average">Moyenne Semestre 2</Label>
                <Input
                  id="s2-average"
                  type="number"
                  min="0"
                  max="20"
                  step="0.01"
                  placeholder="Ex: 15.2"
                  value={s2Average}
                  onChange={(e) => setS2Average(e.target.value)}
                  className="transition-all duration-200 focus:scale-105"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="s2-credits">Crédits Semestre 2</Label>
                <Input
                  id="s2-credits"
                  type="number"
                  min="1"
                  max="60"
                  placeholder="Ex: 30"
                  value={s2Credits}
                  onChange={(e) => setS2Credits(e.target.value)}
                  className="transition-all duration-200 focus:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Formula Display */}
          <motion.div
            className="mt-8 p-4 rounded-lg bg-muted/50 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-sm text-muted-foreground mb-2">Formule utilisée:</p>
            <p className="font-mono text-sm">
              Moyenne Annuelle = ((Moyenne S1 × Crédits S1) + (Moyenne S2 × Crédits S2)) / Crédits Totaux
            </p>
          </motion.div>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          onClick={calculateAnnual}
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
          {isCalculating ? 'Calcul en cours...' : 'Calculer Moyenne Annuelle'}
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
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-2">Résultat du calcul annuel</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <h4 className="font-semibold mb-2">Semestre 1</h4>
                  <p className={`text-2xl font-bold ${getGradeColor(result.s1Average)}`}>
                    {result.s1Average}/20
                  </p>
                  <p className="text-sm text-muted-foreground">{result.s1Credits} crédits</p>
                </div>

                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <h4 className="font-semibold mb-2">Semestre 2</h4>
                  <p className={`text-2xl font-bold ${getGradeColor(result.s2Average)}`}>
                    {result.s2Average}/20
                  </p>
                  <p className="text-sm text-muted-foreground">{result.s2Credits} crédits</p>
                </div>
              </div>

              <div className="text-center p-6 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                <h4 className="text-xl font-bold mb-2">Moyenne Annuelle</h4>
                <p className={`text-5xl font-bold ${getGradeColor(result.annualAverage)}`}>
                  {result.annualAverage}/20
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {result.totalCredits} crédits totaux - {getValidationStatus(result.annualAverage)}
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};