import { Module, Unit } from '@/types/modules';

export interface ModuleGrade {
  moduleCode: string;
  grade: number;
  credit: number;
}

export interface UnitResult {
  name: string;
  average: number;
  totalCredits: number;
  validated: boolean;
}

export interface SemesterResult {
  average: number;
  totalCredits: number;
  unitResults: UnitResult[];
  validated: boolean;
}

export interface AnnualResult {
  s1Average: number;
  s2Average: number;
  s1Credits: number;
  s2Credits: number;
  annualAverage: number;
  totalCredits: number;
}

// Calculate average for a single module
export const calculateModuleAverage = (grade: number): number => {
  return Math.round(grade * 100) / 100;
};

// Calculate average for a unit (UEF, UEM, UED, UET)
export const calculateUnitAverage = (moduleGrades: ModuleGrade[]): number => {
  if (moduleGrades.length === 0) return 0;
  
  const totalWeightedGrades = moduleGrades.reduce((sum, module) => 
    sum + (module.grade * module.credit), 0
  );
  const totalCredits = moduleGrades.reduce((sum, module) => sum + module.credit, 0);
  
  return totalCredits > 0 ? Math.round((totalWeightedGrades / totalCredits) * 100) / 100 : 0;
};

// Calculate semester average
export const calculateSemesterAverage = (units: Unit[], moduleGrades: ModuleGrade[]): SemesterResult => {
  const unitResults: UnitResult[] = [];
  let totalWeightedGrades = 0;
  let totalCredits = 0;

  units.forEach(unit => {
    const unitModuleGrades = moduleGrades.filter(grade => 
      unit.modules.some(module => module.code === grade.moduleCode)
    );
    
    if (unitModuleGrades.length > 0) {
      const unitAverage = calculateUnitAverage(unitModuleGrades);
      const unitCredits = unit.credit; // Use credit instead of totalCredits
      const validated = unitAverage >= 10;
      
      unitResults.push({
        name: unit.ue, // Use ue instead of name
        average: unitAverage,
        totalCredits: unitCredits,
        validated
      });
      
      totalWeightedGrades += unitAverage * unitCredits;
      totalCredits += unitCredits;
    }
  });

  const semesterAverage = totalCredits > 0 ? Math.round((totalWeightedGrades / totalCredits) * 100) / 100 : 0;
  
  return {
    average: semesterAverage,
    totalCredits,
    unitResults,
    validated: semesterAverage >= 10
  };
};

// Calculate annual average
export const calculateAnnualAverage = (
  s1Average: number, 
  s1Credits: number, 
  s2Average: number, 
  s2Credits: number
): AnnualResult => {
  const totalCredits = s1Credits + s2Credits;
  const annualAverage = totalCredits > 0 
    ? Math.round(((s1Average * s1Credits) + (s2Average * s2Credits)) / totalCredits * 100) / 100 
    : 0;

  return {
    s1Average,
    s2Average,
    s1Credits,
    s2Credits,
    annualAverage,
    totalCredits
  };
};

// Validate grade input
export const validateGrade = (grade: number): boolean => {
  return grade >= 0 && grade <= 20;
};

// Get grade scale color
export const getGradeColor = (grade: number): string => {
  if (grade >= 16) return 'text-green-600 dark:text-green-400';
  if (grade >= 14) return 'text-blue-600 dark:text-blue-400';
  if (grade >= 12) return 'text-yellow-600 dark:text-yellow-400';
  if (grade >= 10) return 'text-orange-600 dark:text-orange-400';
  return 'text-red-600 dark:text-red-400';
};

// Get validation status
export const getValidationStatus = (average: number): string => {
  if (average >= 10) return 'Validé ✅';
  return 'Non validé ❌';
};