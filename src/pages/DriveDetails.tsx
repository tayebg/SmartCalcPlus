import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, ArrowLeft, FolderOpen } from 'lucide-react';
import { drives } from '@/constants/drives';

export const DriveDetails = () => {
  const { driveId } = useParams<{ driveId: string }>(); // year
  const section = drives.find((s) => s.year === driveId);

  if (!section) {
    return (
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Drive section not found</h1>
          <Link to="/drives">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Drives
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link to="/drives" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Drives
          </Link>

          <div className="flex items-center mb-4">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-elegant mr-4`}>
              <FolderOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{section.year}</h1>
              <p className="text-lg text-muted-foreground">Ressources Google Drive</p>
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="outline">{section.year}</Badge>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content: list of drive items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {section.items.map((item, idx) => (
            <Card key={idx} className="p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">Ressources, cours, examens et plus.</p>
              </div>
              <Button
                variant="gradient"
                onClick={() => (item.url ? window.open(item.url, '_blank') : undefined)}
                disabled={!item.url}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                {item.url ? 'Open Drive' : 'Coming Soon'}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};