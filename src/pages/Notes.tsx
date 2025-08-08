import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { BookOpen, Calculator, TrendingUp, Award } from 'lucide-react';

const calculationMethods = [
  {
    title: 'Moyenne d\'Unité',
    description: 'Méthode de calcul de la moyenne d\'une unité d\'enseignement',
    formula: 'Moyenne UE = Σ(Note × Crédit) / Σ(Crédits)',
    details: [
      'Chaque module est pondéré par son nombre de crédits',
      'La moyenne de l\'unité doit être ≥ 10/20 pour validation',
      'Compensation possible entre modules de la même unité'
    ],
    icon: Calculator,
    color: 'from-blue-500 to-cyan-600'
  },
  {
    title: 'Moyenne Semestrielle',
    description: 'Calcul de la moyenne générale du semestre',
    formula: 'Moyenne S = Σ(Moyenne UE × Crédits UE) / Σ(Crédits UE)',
    details: [
      'Moyennes des unités pondérées par leurs crédits',
      'Validation si moyenne ≥ 10/20',
      'Compensation possible entre unités du même semestre'
    ],
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-600'
  },
  {
    title: 'Règles de Crédits',
    description: 'Système de crédits ECTS appliqué au LMD',
    formula: '30 crédits = 1 semestre / 60 crédits = 1 année',
    details: [
      'L1, L2, L3 : 180 crédits (3 × 60)',
      'M1, M2 : 120 crédits (2 × 60)',
      'Doctorat : 180 crédits (3 × 60)',
      'Validation progressive par acquisition de crédits'
    ],
    icon: BookOpen,
    color: 'from-purple-500 to-indigo-600'
  },
  {
    title: 'Moyenne Annuelle',
    description: 'Calcul de la moyenne sur l\'ensemble de l\'année',
    formula: 'Moyenne Annuelle = (Moy S1 × Crédits S1 + Moy S2 × Crédits S2) / (Crédits S1 + Crédits S2)',
    details: [
      'Pondération par les crédits de chaque semestre',
      'Généralement 30 crédits par semestre',
      'Validation de l\'année si moyenne ≥ 10/20',
      'Possibilité de redoublement ou de passage conditionnel'
    ],
    icon: Award,
    color: 'from-orange-500 to-red-600'
  }
];

const additionalInfo = [
  {
    title: 'Système LMD',
    content: 'Le système Licence-Master-Doctorat harmonise l\'enseignement supérieur avec les standards européens.'
  },
  {
    title: 'USTO-MB',
    content: 'Université des Sciences et de la Technologie d\'Oran Mohamed Boudiaf - Département d\'Informatique.'
  },
  {
    title: 'Validation',
    content: 'Une unité/semestre/année est validé(e) si la moyenne est ≥ 10/20. Compensation possible selon le règlement.'
  }
];

export const Notes = () => {
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
          <h1 className="text-4xl font-bold mb-4">Notes Méthodologiques</h1>
          <p className="text-xl text-muted-foreground">
            Méthodes de calcul et règles du système LMD
          </p>
        </motion.div>

        {/* Calculation Methods */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {calculationMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Card className="p-6 h-full border-2 border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${method.color} flex items-center justify-center shadow-elegant`}>
                    <method.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                    <p className="text-muted-foreground mb-4">{method.description}</p>
                    
                    <div className="bg-muted/50 p-3 rounded-lg mb-4">
                      <code className="text-sm font-mono text-primary">{method.formula}</code>
                    </div>
                    
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {method.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Information */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {additionalInfo.map((info, index) => (
            <motion.div
              key={info.title}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-6 text-center bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                <h4 className="font-semibold mb-2 text-primary">{info.title}</h4>
                <p className="text-sm text-muted-foreground">{info.content}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Platform Note */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30">
            <h3 className="text-lg font-semibold mb-2">À propos de SmartCalc+</h3>
            <p className="text-muted-foreground">
              Cette plateforme est principalement conçue pour les étudiants LMD de l'USTO-MB 
              (Département d'Informatique). Cependant, tous les étudiants en informatique 
              peuvent bénéficier de ces outils de calcul.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};