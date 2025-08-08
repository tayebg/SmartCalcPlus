// Master Grade Calculation Logic (50% Exam, 50% CC)
// Used for M1, M2 (IA, SID, RSID)

export const calculateModuleAverageMaster = (td = 0, tp = 0, exam = 0, hasTD = false, hasTP = false, hasCC = false, hasExam = true) => {
  // Convert empty values to 0
  const tdGrade = td || 0;
  const tpGrade = tp || 0;
  const examGrade = exam || 0;

  let cc = 0;
  let moyenne = 0;

  // Calculate CC (Contrôle Continu)
  if (hasTD && hasTP) {
    cc = (tdGrade + tpGrade) / 2;
  } else if (hasTD || hasTP) {
    cc = hasTD ? tdGrade : tpGrade;
  }

  // Calculate final average
  if (hasCC && hasExam) {
    moyenne = (0.5 * cc) + (0.5 * examGrade);
  } else if (hasExam) {
    moyenne = examGrade;
  } else if (hasCC) {
    moyenne = cc;
  }

  return Math.round(moyenne * 100) / 100;
};

export const calculateUnitAverageMaster = (moduleGrades) => {
  if (moduleGrades.length === 0) return 0;
  
  const totalWeightedGrades = moduleGrades.reduce((sum, module) => 
    sum + (module.grade * module.credit), 0
  );
  const totalCredits = moduleGrades.reduce((sum, module) => sum + module.credit, 0);
  
  return totalCredits > 0 ? Math.round((totalWeightedGrades / totalCredits) * 100) / 100 : 0;
};

export const calculateSemesterAverageMaster = (units, moduleGrades) => {
  const unitResults = [];
  let totalWeightedGrades = 0;
  let totalCredits = 0;

  units.forEach(unit => {
    const unitModuleGrades = moduleGrades.filter(grade => 
      unit.modules.some(module => module.code === grade.moduleCode)
    );
    
    if (unitModuleGrades.length > 0) {
      const unitAverage = calculateUnitAverageMaster(unitModuleGrades);
      const unitCredits = unit.credit;
      const validated = unitAverage >= 10;
      
      unitResults.push({
        name: unit.ue,
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

export const calculateAnnualAverageMaster = (s1Average, s1Credits, s2Average, s2Credits) => {
  const totalCredits = s1Credits + s2Credits;
  const annualAverage = totalCredits > 0 
    ? Math.round(((s1Average * s1Credits) + (s2Average * s2Credits)) / totalCredits * 100) / 100 
    : 0;

  // Auto-grant 30 credits if annual average >= 10
  const creditsObtained = annualAverage >= 10 ? 30 : (s1Credits + s2Credits);

  return {
    s1Average,
    s2Average,
    s1Credits,
    s2Credits,
    annualAverage,
    totalCredits,
    creditsObtained,
    validated: annualAverage >= 10
  };
};

export const validateGradeMaster = (grade) => {
  return grade >= 0 && grade <= 20;
};

export const getGradeColorMaster = (grade) => {
  if (grade >= 16) return 'text-green-600 dark:text-green-400';
  if (grade >= 14) return 'text-blue-600 dark:text-blue-400';
  if (grade >= 12) return 'text-yellow-600 dark:text-yellow-400';
  if (grade >= 10) return 'text-orange-600 dark:text-orange-400';
  return 'text-red-600 dark:text-red-400';
};

export const getValidationStatusMaster = (average) => {
  if (average >= 10) return 'Validé ✅';
  return 'Non validé ❌';
};