import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Play, Clock, BookOpen, Users, ExternalLink, Search, Globe, MessageCircle } from 'lucide-react';
import { videoSpecializations, videoLevels, VideoSpecialization } from '@/constants/videos';
import { SpecializationModal } from '@/components/modals/SpecializationModal';
// import AdBanner from '@/components/AdBanner'; // Temporarily disabled (AdSense approval pending)

export const Videos = () => {
  const [activeLevel, setActiveLevel] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<VideoSpecialization | null>(null);
  const navigate = useNavigate();

// Normalize helper to make search predictable
const normalize = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim();

const filteredSpecializations = videoSpecializations.filter((spec) => {
  const q = normalize(searchQuery);
  const matchesLevel =
    activeLevel === 'All' ||
    spec.id.startsWith(activeLevel) ||
    (activeLevel === 'Other' && spec.id === 'Other') ||
    (activeLevel === 'Profiles' && spec.id === 'Profiles');
  if (!q) return matchesLevel;
  const matchesSearch =
    normalize(spec.name).includes(q) ||
    spec.videos.some((video) =>
      normalize(video.title).includes(q) ||
      (video.subject ? normalize(video.subject).includes(q) : false) ||
      normalize(video.url).includes(q)
    );
  return matchesLevel && matchesSearch;
});

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold mb-4">Video Tutorials</h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive video content for all LMD levels and specializations
          </p>
        </motion.div>

        {/* Ads disabled (pending AdSense approval)
        <div className="mb-8">
          <AdBanner />
        </div>
        */}
        {/* Search and Filters */}
        <motion.div
          className="mb-8 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by title, URL, specialization, or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Level Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {videoLevels.map((level) => (
              <Badge
                key={level}
                variant={activeLevel === level ? "default" : "outline"}
                className="cursor-pointer px-4 py-2 transition-smooth hover:scale-105"
                onClick={() => setActiveLevel(level)}
              >
                {level}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Specializations Grid */}
        <AnimatePresence mode="wait">
          {filteredSpecializations.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {filteredSpecializations.map((spec, index) => (
                <motion.div
                  key={spec.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="p-6 h-full group relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:scale-[1.02] border-2 border-transparent hover:border-primary/30 bg-gradient-to-br from-background to-muted/20">
                    {/* Gradient border effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${spec.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-lg`} />
                    
                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-center mb-6">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${spec.color} flex items-center justify-center shadow-elegant mr-4`}>
                          <Play className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-xl group-hover:text-primary transition-colors duration-300">
                            {spec.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {spec.description}
                          </p>
                        </div>
                      </div>

                      {/* Videos Preview */}
                      <div className="space-y-3">
                        {spec.videos.slice(0, 3).map((video, videoIndex) => (
                          <motion.div
                            key={videoIndex}
                            className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 group/video"
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium group-hover/video:text-primary transition-colors duration-200 truncate">
                                {video.title}
                              </h4>
                              <div className="flex items-center text-xs text-muted-foreground mt-1 space-x-3">
                                <span className="flex items-center">
                                  {video.type === 'playlist' && <BookOpen className="w-3 h-3 mr-1" />}
                                  {video.type === 'video' && <Play className="w-3 h-3 mr-1" />}
                                  {video.type === 'channel' && <Users className="w-3 h-3 mr-1" />}
                                  {video.type === 'website' && <Globe className="w-3 h-3 mr-1" />}
                                  {video.type === 'telegram' && <MessageCircle className="w-3 h-3 mr-1" />}
                                  {video.type === 'playlist' ? 'Playlist' : 
                                   video.type === 'video' ? 'Vidéo' : 
                                   video.type === 'channel' ? 'Chaîne' :
                                   video.type === 'website' ? 'Site Web' : 'Telegram'}
                                </span>
                                {video.subject && (
                                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">
                                    {video.subject}
                                  </span>
                                )}
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="opacity-0 group-hover/video:opacity-100 transition-opacity duration-200 flex-shrink-0"
                              onClick={() => window.open(video.url, '_blank')}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </motion.div>
                        ))}
                        {spec.videos.length > 3 && (
                          <div className="text-center text-sm text-muted-foreground">
                            +{spec.videos.length - 3} autres ressources...
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      <div className="mt-6 pt-4 border-t border-border/50">
                        <Button
                          variant="gradient"
                          className="w-full transition-smooth hover:scale-105"
                          onClick={() => navigate(`/videos/${spec.id}`)}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Voir Tout
                        </Button>
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground mt-3">
                          <span className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-1" />
                            {spec.videos.length} contenus
                          </span>
                          <span className="flex items-center">
                            <Play className="w-4 h-4 mr-1" />
                            {spec.videos.filter(v => v.type === 'playlist').length} playlists
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl mb-4">📹</div>
              <h3 className="text-2xl font-semibold mb-2">Aucun résultat trouvé</h3>
              <p className="text-muted-foreground">
                Modifiez votre recherche ou le niveau
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setActiveLevel('All');
                }}
              >
                Réinitialiser les filtres
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Autres liens Section */}
        <motion.div
          className="mt-16 pt-8 border-t border-border/50"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center">
            🔗 Autres liens
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.a
              href="https://www.physiquechimiemathbiologie.com/?m=1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105 group"
              whileHover={{ y: -2 }}
            >
              <Globe className="w-5 h-5 text-blue-500 mr-3" />
              <div>
                <h3 className="font-medium group-hover:text-blue-500 transition-colors">Sciences Hub</h3>
                <p className="text-xs text-muted-foreground">Physique • Chimie • Math</p>
              </div>
            </motion.a>

            <motion.a
              href="https://tresor.cse.club/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105 group"
              whileHover={{ y: -2 }}
            >
              <Globe className="w-5 h-5 text-purple-500 mr-3" />
              <div>
                <h3 className="font-medium group-hover:text-purple-500 transition-colors">Trésor CSE</h3>
                <p className="text-xs text-muted-foreground">Computer Science Resources</p>
              </div>
            </motion.a>

            <motion.a
              href="https://t.me/l3isil_si"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-gradient-to-r from-sky-500/10 to-blue-500/10 rounded-lg border border-sky-500/20 hover:border-sky-500/40 transition-all duration-300 hover:scale-105 group"
              whileHover={{ y: -2 }}
            >
              <MessageCircle className="w-5 h-5 text-sky-500 mr-3" />
              <div>
                <h3 className="font-medium group-hover:text-sky-500 transition-colors">L3 ISIL/SI</h3>
                <p className="text-xs text-muted-foreground">Telegram Group</p>
              </div>
            </motion.a>

            <motion.a
              href="https://t.me/l1informatique"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:scale-105 group"
              whileHover={{ y: -2 }}
            >
              <MessageCircle className="w-5 h-5 text-green-500 mr-3" />
              <div>
                <h3 className="font-medium group-hover:text-green-500 transition-colors">L1 Informatique</h3>
                <p className="text-xs text-muted-foreground">Telegram Group</p>
              </div>
            </motion.a>

            <motion.a
              href="https://t.me/l2informatique"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:scale-105 group"
              whileHover={{ y: -2 }}
            >
              <MessageCircle className="w-5 h-5 text-orange-500 mr-3" />
              <div>
                <h3 className="font-medium group-hover:text-orange-500 transition-colors">L2 Informatique</h3>
                <p className="text-xs text-muted-foreground">Telegram Group</p>
              </div>
            </motion.a>

            <motion.a
              href="https://t.me/master1info"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-lg border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300 hover:scale-105 group"
              whileHover={{ y: -2 }}
            >
              <MessageCircle className="w-5 h-5 text-violet-500 mr-3" />
              <div>
                <h3 className="font-medium group-hover:text-violet-500 transition-colors">Master 1 Info</h3>
                <p className="text-xs text-muted-foreground">Telegram Group</p>
              </div>
            </motion.a>
          </div>
        </motion.div>
      </div>
      
    </div>
  );
};