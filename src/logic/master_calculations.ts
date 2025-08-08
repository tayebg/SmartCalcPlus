import { Module, Unit } from '@/types/modules';

export interface ModuleGrades {
  td?: number;
  tp?: number;
  exam?: number;
}

export interface CalculationResult {
  average: number;
  credits: number;
}

// Core calculation functions
export function sumValues(array: number[]): number {
  return array.reduce((acc, val) => acc + (parseFloat(val.toString()) || 0), 0);
}

export function calculateAverage(grades: number[], coefficients: number[]): number {
  const total = grades.reduce((sum, grade, i) => sum + grade * coefficients[i], 0);
  const totalCoeff = sumValues(coefficients);
  return totalCoeff !== 0 ? total / totalCoeff : 0;
}

export function isValidValue(value: any): boolean {
  return value !== '' && !isNaN(parseFloat(value));
}

export function calculateGlobalAverage(semesters: CalculationResult[]): number {
  const validSemesters = semesters.filter(sem => !isNaN(sem.average));
  if (validSemesters.length === 0) return 0;
  
  const total = validSemesters.reduce((sum, sem) => sum + sem.average, 0);
  return total / validSemesters.length;
}

// Master-specific calculation logic
export const logicIA = {
  calculateModuleAverage: (mod: Module, grades: ModuleGrades): number => {
    let cc = 0, ccCount = 0;
    
    // Treat empty grades as 0
    const tdGrade = grades.td !== undefined ? grades.td : (mod.has_td ? 0 : undefined);
    const tpGrade = grades.tp !== undefined ? grades.tp : (mod.has_tp ? 0 : undefined);
    const examGrade = grades.exam !== undefined ? grades.exam : (mod.has_exam ? 0 : undefined);
    
    if (tdGrade !== undefined) {
      cc += tdGrade;
      ccCount++;
    }
    if (tpGrade !== undefined) {
      cc += tpGrade;
      ccCount++;
    }
    
    if (ccCount > 0) cc = cc / ccCount;
    
    if (examGrade !== undefined && ccCount > 0) {
      return (cc + examGrade) / 2;
    } else if (examGrade !== undefined) {
      return examGrade;
    } else if (ccCount > 0) {
      return cc;
    }
    
    return NaN;
  },
  
  validateSemester: (semesterData: any[], sem: number): CalculationResult => {
    let totalPoints = 0, totalCoeff = 0, totalCredits = 0;
    
    semesterData.forEach(ue => {
      let uePoints = 0, ueCoeff = 0, ueCredits = 0;
      
      ue.modules.forEach((mod: any) => {
        if (!isNaN(mod.average)) {
          uePoints += mod.average * mod.coeff;
          ueCoeff += mod.coeff;
          if (mod.average >= 10) ueCredits += mod.credit;
        }
      });
      
      const ueAverage = ueCoeff ? uePoints / ueCoeff : NaN;
      if (!isNaN(ueAverage)) {
        totalPoints += ueAverage * ue.coeff;
        totalCoeff += ue.coeff;
        if (ueAverage >= 10) totalCredits += ue.credit;
        else totalCredits += ueCredits;
      }
    });
    
    const semesterAverage = totalCoeff ? totalPoints / totalCoeff : NaN;
    if (semesterAverage >= 10) totalCredits = 30;
    
    return {
      average: semesterAverage,
      credits: totalCredits
    };
  }
};

export const logicSID = logicIA;
export const logicRSID = logicIA;

// Licence logic (60% Exam, 40% CC)
export const logicLicence = {
  calculateModuleAverage: (mod: Module, grades: ModuleGrades): number => {
    let cc = 0, ccCount = 0;
    
    // Treat empty grades as 0
    const tdGrade = grades.td !== undefined ? grades.td : (mod.has_td ? 0 : undefined);
    const tpGrade = grades.tp !== undefined ? grades.tp : (mod.has_tp ? 0 : undefined);
    const examGrade = grades.exam !== undefined ? grades.exam : (mod.has_exam ? 0 : undefined);
    
    if (tdGrade !== undefined) {
      cc += tdGrade;
      ccCount++;
    }
    if (tpGrade !== undefined) {
      cc += tpGrade;
      ccCount++;
    }
    
    if (ccCount > 0) cc = cc / ccCount;
    
    // Licence specific calculation: 60% Exam, 40% CC
    if (examGrade !== undefined && ccCount > 0) {
      return (0.4 * cc) + (0.6 * examGrade);
    } else if (examGrade !== undefined) {
      return examGrade;
    } else if (ccCount > 0) {
      return cc;
    }
    
    return NaN;
  },
  
  validateSemester: (semesterData: any[], sem: number): CalculationResult => {
    let totalPoints = 0, totalCoeff = 0, totalCredits = 0;
    
    semesterData.forEach(ue => {
      let uePoints = 0, ueCoeff = 0, ueCredits = 0;
      
      ue.modules.forEach((mod: any) => {
        if (!isNaN(mod.average)) {
          uePoints += mod.average * mod.coeff;
          ueCoeff += mod.coeff;
          if (mod.average >= 10) ueCredits += mod.credit;
        }
      });
      
      const ueAverage = ueCoeff ? uePoints / ueCoeff : NaN;
      if (!isNaN(ueAverage)) {
        totalPoints += ueAverage * ue.coeff;
        totalCoeff += ue.coeff;
        if (ueAverage >= 10) totalCredits += ue.credit;
        else totalCredits += ueCredits;
      }
    });
    
    const semesterAverage = totalCoeff ? totalPoints / totalCoeff : NaN;
    if (semesterAverage >= 10) totalCredits = 30;
    
    return {
      average: semesterAverage,
      credits: totalCredits
    };
  }
};

// Grade validation
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