import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  File, 
  Presentation, 
  PlayCircle,
  Image as ImageIcon,
  Code,
  Download,
  ExternalLink,
  X
} from 'lucide-react';

interface DriveFile {
  id: string;
  name: string;
  type: string;
  size: string;
  modifiedTime: string;
  webViewLink?: string;
  thumbnailLink?: string;
  downloadUrl?: string;
}

interface FileViewerProps {
  files: DriveFile[];
  isLoading: boolean;
  onClose: () => void;
  specialization: string;
}

const getFileIcon = (mimeType: string) => {
  if (mimeType.includes('pdf')) return <FileText className="w-6 h-6 text-red-500" />;
  if (mimeType.includes('document') || mimeType.includes('word')) return <File className="w-6 h-6 text-blue-500" />;
  if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return <Presentation className="w-6 h-6 text-orange-500" />;
  if (mimeType.includes('video')) return <PlayCircle className="w-6 h-6 text-purple-500" />;
  if (mimeType.includes('image')) return <ImageIcon className="w-6 h-6 text-green-500" />;
  if (mimeType.includes('text') || mimeType.includes('code') || mimeType.includes('python') || mimeType.includes('sql')) return <Code className="w-6 h-6 text-yellow-500" />;
  if (mimeType === 'folder') return <File className="w-6 h-6 text-blue-400" />;
  if (mimeType.includes('zip') || mimeType.includes('archive')) return <File className="w-6 h-6 text-purple-400" />;
  return <File className="w-6 h-6 text-gray-500" />;
};

const getFileTypeColor = (mimeType: string) => {
  if (mimeType.includes('pdf')) return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950';
  if (mimeType.includes('document')) return 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950';
  if (mimeType.includes('presentation')) return 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950';
  if (mimeType.includes('video')) return 'border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950';
  if (mimeType.includes('image')) return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950';
  return 'border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950';
};

export const FileViewer = ({ files, isLoading, onClose, specialization }: FileViewerProps) => {
  const [selectedFile, setSelectedFile] = useState<DriveFile | null>(null);

  if (isLoading) {
    return (
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Card className="p-8 max-w-md text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Loading Drive Contents</h3>
          <p className="text-muted-foreground">Fetching files from {specialization} drive...</p>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="min-h-screen pt-8 pb-8 px-4">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">{specialization} Drive Contents</h2>
              <p className="text-white/70">{files.length} files found</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => window.open('https://drive.google.com/drive/folders/', '_blank')}
                className="text-white border-white/20 hover:bg-white/10"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in Google Drive
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white hover:bg-white/10"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
          </div>

          {/* Files Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {files.map((file, index) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -2 }}
              >
                <Card className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-xl ${getFileTypeColor(file.type)}`}>
                  <div className="flex items-start justify-between mb-3">
                    {getFileIcon(file.type)}
                    <Badge variant="secondary" className="text-xs">
                      {file.size}
                    </Badge>
                  </div>

                  <h3 className="font-medium text-sm mb-2 line-clamp-2">
                    {file.name}
                  </h3>

                  <p className="text-xs text-muted-foreground mb-4">
                    Modified: {new Date(file.modifiedTime).toLocaleDateString()}
                  </p>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={() => setSelectedFile(file)}
                    >
                      Preview
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => file.downloadUrl && window.open(file.downloadUrl, '_blank')}
                    >
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {files.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="text-6xl mb-4">📁</div>
              <h3 className="text-2xl font-semibold mb-2 text-white">No files found</h3>
              <p className="text-white/70">
                This drive folder appears to be empty or inaccessible
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* File Preview Modal */}
      {selectedFile && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-60 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedFile(null)}
        >
          <motion.div
            className="bg-card rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getFileIcon(selectedFile.type)}
                <div>
                  <h3 className="font-semibold">{selectedFile.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedFile.size}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedFile(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="bg-gradient-to-br from-background to-muted/50 rounded-lg border-2 border-dashed border-border p-8 text-center">
              <div className="text-4xl mb-4">📄</div>
              <h4 className="font-semibold mb-2">File Preview</h4>
              <p className="text-muted-foreground mb-4">
                Preview functionality will be implemented here
              </p>
              <div className="flex space-x-2 justify-center">
                <Button 
                  variant="gradient"
                  onClick={() => selectedFile.webViewLink && window.open(selectedFile.webViewLink, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open in Drive
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => selectedFile.downloadUrl && window.open(selectedFile.downloadUrl, '_blank')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};