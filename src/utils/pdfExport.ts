import jsPDF from 'jspdf';

export interface CalculationResult {
  level: string;
  semester?: string;
  studentName?: string;
  modules: Array<{
    name: string;
    grade: number;
    coefficient: number;
    average: number;
  }>;
  semesterAverage?: number;
  annualAverage?: number;
  totalCredits?: number;
}

export const exportToPDF = (data: CalculationResult) => {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'p' });

  const margin = { top: 20, left: 20, right: 20 };
  let y = margin.top;

  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('Relevé de Notes', margin.left, y);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  y += 8;
  doc.text(`Université: SmartCalc+`, margin.left, y);
  y += 6;
  doc.text(`Étudiant: ${data.studentName ? data.studentName : '............................'}`, margin.left, y);
  y += 6;
  doc.text(`Niveau: ${data.level}${data.semester ? `  |  Semestre: ${data.semester}` : ''}`, margin.left, y);
  y += 6;
  doc.text(`Date: ${new Date().toLocaleDateString()}`, margin.left, y);

  // Separator
  y += 6;
  doc.setDrawColor(150);
  doc.line(margin.left, y, 210 - margin.right, y);
  y += 8;

  // Table headers
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  const colX = { name: margin.left, coeff: 120, grade: 150, avg: 180 };
  doc.text('Matière', colX.name, y);
  doc.text('Coeff', colX.coeff, y);
  doc.text('Note', colX.grade, y);
  doc.text('Moyenne', colX.avg, y);

  y += 3;
  doc.setDrawColor(200);
  doc.line(margin.left, y, 210 - margin.right, y);
  y += 6;

  // Rows
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  const lineHeight = 7;

  data.modules.forEach((m) => {
    // Add page if near bottom
    if (y > 270) {
      doc.addPage();
      y = margin.top;
    }
    // Truncate/fit name
    const name = m.name.length > 60 ? m.name.substring(0, 57) + '...' : m.name;
    doc.text(name, colX.name, y);
    doc.text(String(m.coefficient), colX.coeff, y, { align: 'right' });
    doc.text(m.grade.toFixed(2), colX.grade, y, { align: 'right' });
    doc.text(m.average.toFixed(2), colX.avg, y, { align: 'right' });
    y += lineHeight;
  });

  // Summary box
  y += 4;
doc.setDrawColor(180);
doc.setFillColor(245, 245, 245);
doc.roundedRect(margin.left, y, 210 - margin.left - margin.right, 24, 2, 2, 'S');
  y += 8;
  doc.setFont('helvetica', 'bold');
  doc.text('Récapitulatif', margin.left + 4, y);
  doc.setFont('helvetica', 'normal');
  y += 7;
  let summaryX = margin.left + 6;
  if (data.semesterAverage !== undefined) {
    doc.text(`Moyenne du Semestre: ${data.semesterAverage.toFixed(2)}/20`, summaryX, y);
    summaryX += 70;
  }
  if (data.totalCredits !== undefined) {
    doc.text(`Crédits: ${data.totalCredits}`, summaryX, y);
  }
  if (data.annualAverage !== undefined) {
    y += 7;
    doc.text(`Moyenne Annuelle: ${data.annualAverage.toFixed(2)}/20`, margin.left + 6, y);
  }

  // Footer
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Généré par SmartCalc+ – https://smartcalc-plus.vercel.app', margin.left, 290);

  doc.save(`releve-${data.level}-${Date.now()}.pdf`);
};

export const resetAllData = () => {
  // Clear localStorage data if any
  localStorage.removeItem('smartcalc-data');
  
  // Trigger page refresh to reset all form data
  window.location.reload();
};