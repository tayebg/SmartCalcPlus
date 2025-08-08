import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye } from 'lucide-react';

const canevasData = [
  {
    id: 'L3ISIL',
    name: 'L3 ISIL Canevas',
    description: 'ISIL specialization templates and forms',
    fileName: 'canevasL3ISIL.pdf',
    color: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'L3SI',
    name: 'L3 SI Canevas',
    description: 'SI specialization templates and forms',
    fileName: 'canevasL3SI.pdf',
    color: 'from-teal-500 to-cyan-600'
  },
  {
    id: 'IA',
    name: 'Master IA Canevas',
    description: 'M1 & M2 IA specialization templates',
    fileName: 'canevasM1IA.pdf',
    color: 'from-violet-500 to-purple-600'
  },
  {
    id: 'SID',
    name: 'Master SID Canevas',
    description: 'M1 & M2 SID specialization templates',
    fileName: 'canevasM1SID.pdf',
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'RSID',
    name: 'Master RSID Canevas',
    description: 'M1 & M2 RSID specialization templates',
    fileName: 'canevasM1RSID.pdf',
    color: 'from-yellow-500 to-orange-600'
  },
];

export const Canevas = () => {
  const handleView = (fileName: string) => {
    const pdfUrl = `/canevas/${fileName}`;
    window.open(pdfUrl, '_blank');
  };

  const handleDownload = (fileName: string) => {
    const pdfUrl = `/canevas/${fileName}`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
          <h1 className="text-4xl font-bold mb-4">Canevas Library</h1>
          <p className="text-xl text-muted-foreground">
            Access PDF templates and forms for all academic levels
          </p>
        </motion.div>

        {/* Canevas Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {canevasData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="p-6 cursor-pointer border-2 border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-glow group relative overflow-hidden">
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg`} />
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center shadow-elegant`}>
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-center mb-2 group-hover:text-primary transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="text-muted-foreground text-center mb-6">{item.description}</p>
                  
                  <div className="flex justify-center mb-4">
                    <Badge variant="outline" className="px-3 py-1">
                      PDF File
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full hover:bg-primary/10 transition-all duration-300"
                      onClick={() => handleView(item.fileName)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View PDF
                    </Button>
                    
                    <Button
                      variant="gradient"
                      className="w-full shadow-elegant hover:shadow-glow transition-all duration-300"
                      onClick={() => handleDownload(item.fileName)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};