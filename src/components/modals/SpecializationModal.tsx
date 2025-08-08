import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VideoSpecialization } from "@/constants/videos";
import { motion } from "framer-motion";
import { X, Play, Clock, BookOpen, ExternalLink, Users, Video, Globe, MessageCircle } from "lucide-react";

interface SpecializationModalProps {
  isOpen: boolean;
  onClose: () => void;
  specialization: VideoSpecialization | null;
}

export const SpecializationModal = ({ 
  isOpen, 
  onClose, 
  specialization 
}: SpecializationModalProps) => {
  if (!specialization) return null;

  const playlistCount = specialization.videos.filter(v => v.type === 'playlist').length;
  const videoCount = specialization.videos.filter(v => v.type === 'video').length;
  const channelCount = specialization.videos.filter(v => v.type === 'channel').length;
  const websiteCount = specialization.videos.filter(v => v.type === 'website').length;
  const telegramCount = specialization.videos.filter(v => v.type === 'telegram').length;

  // Group videos by subject
  const groupedVideos = specialization.videos.reduce((acc, video) => {
    const subject = video.subject || 'Général';
    if (!acc[subject]) acc[subject] = [];
    acc[subject].push(video);
    return acc;
  }, {} as Record<string, typeof specialization.videos>);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden p-0">
        <div className="relative">
          {/* Header with gradient background */}
          <div className={`relative p-4 sm:p-6 lg:p-8 bg-gradient-to-r ${specialization.color} text-white overflow-hidden`}>
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10">
              <div className="flex items-start sm:items-center justify-between mb-4">
                <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1 pr-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold truncate">{specialization.name}</h2>
                    <p className="text-white/90 text-xs sm:text-sm lg:text-lg">{specialization.description}</p>
                  </div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{playlistCount} playlists</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Video className="w-4 h-4" />
                  <span>{videoCount} vidéos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>{channelCount} chaînes</span>
                </div>
                {websiteCount > 0 && (
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4" />
                    <span>{websiteCount} sites web</span>
                  </div>
                )}
                {telegramCount > 0 && (
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>{telegramCount} groupes</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-3 sm:p-4 lg:p-6 max-h-[60vh] sm:max-h-[65vh] overflow-y-auto">
            {Object.entries(groupedVideos).map(([subject, videos]) => (
              <div key={subject} className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-primary">{subject}</h3>
                <div className="grid gap-3">
                  {videos.map((video, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group"
                    >
                      <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-background to-muted/20">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            {video.type === 'playlist' && <BookOpen className="w-4 h-4 text-primary flex-shrink-0" />}
                            {video.type === 'video' && <Play className="w-4 h-4 text-primary flex-shrink-0" />}
                            {video.type === 'channel' && <Users className="w-4 h-4 text-primary flex-shrink-0" />}
                            {video.type === 'website' && <Globe className="w-4 h-4 text-primary flex-shrink-0" />}
                            {video.type === 'telegram' && <MessageCircle className="w-4 h-4 text-primary flex-shrink-0" />}
                            <h4 className="font-medium group-hover:text-primary transition-colors duration-200 truncate">
                              {video.title}
                            </h4>
                          </div>
                          <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                            <Badge variant="outline" className="text-xs">
                              {video.type === 'playlist' ? 'Playlist' : 
                               video.type === 'video' ? 'Vidéo' : 
                               video.type === 'channel' ? 'Chaîne' :
                               video.type === 'website' ? 'Site Web' : 'Telegram'}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          onClick={() => window.open(video.url, '_blank')}
                          className="ml-4 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-105 flex-shrink-0"
                          size="sm"
                        >
                          <ExternalLink className="w-4 h-4 mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">Ouvrir</span>
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
            
            {specialization.videos.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📹</div>
                <h3 className="text-xl font-semibold mb-2">Aucune vidéo disponible</h3>
                <p className="text-muted-foreground">
                  Les contenus pour cette spécialisation seront ajoutés prochainement.
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};