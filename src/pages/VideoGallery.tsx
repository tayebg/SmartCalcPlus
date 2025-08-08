import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Play, Clock, BookOpen, Users, ExternalLink, Search, Globe, MessageCircle, ArrowLeft } from 'lucide-react';
import { videoSpecializations, VideoSpecialization } from '@/constants/videos';

export const VideoGallery = () => {
  const { specializationId } = useParams<{ specializationId: string }>();
  const [searchQuery, setSearchQuery] = useState('');

  const specialization = videoSpecializations.find(spec => spec.id === specializationId);

  if (!specialization) {
    return (
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Specialization not found</h1>
          <Link to="/videos">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Videos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

const normalize = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim();
const filteredVideos = specialization.videos.filter((video) => {
  const q = normalize(searchQuery);
  if (!q) return true;
  return (
    normalize(video.title).includes(q) ||
    (video.subject ? normalize(video.subject).includes(q) : false) ||
    normalize(video.url).includes(q)
  );
});

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
          <Link to="/videos" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Videos
          </Link>
          
          <div className="flex items-center mb-4">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${specialization.color} flex items-center justify-center shadow-elegant mr-4`}>
              <Play className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{specialization.name}</h1>
              <p className="text-lg text-muted-foreground">{specialization.description}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{specialization.videos.length} total resources</span>
            <span>{specialization.videos.filter(v => v.type === 'playlist').length} playlists</span>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search videos, subjects, or URLs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        {/* Video Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-6 h-full group relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:scale-[1.02] border-2 border-transparent hover:border-primary/30">
                  {/* Gradient border effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${specialization.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-lg`} />
                  
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        {video.type === 'playlist' && <BookOpen className="w-5 h-5 text-primary" />}
                        {video.type === 'video' && <Play className="w-5 h-5 text-primary" />}
                        {video.type === 'channel' && <Users className="w-5 h-5 text-primary" />}
                        {video.type === 'website' && <Globe className="w-5 h-5 text-primary" />}
                        {video.type === 'telegram' && <MessageCircle className="w-5 h-5 text-primary" />}
                        <Badge variant="outline" className="text-xs">
                          {video.type === 'playlist' ? 'Playlist' : 
                           video.type === 'video' ? 'Vidéo' : 
                           video.type === 'channel' ? 'Chaîne' :
                           video.type === 'website' ? 'Site Web' : 'Telegram'}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors duration-300 mb-2 line-clamp-2">
                        {video.title}
                      </h3>
                      {video.subject && (
                        <Badge className="mb-2">
                          {video.subject}
                        </Badge>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="mt-auto">
                      <Button
                        variant="gradient"
                        className="w-full transition-smooth hover:scale-105"
                        onClick={() => window.open(video.url, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open Resource
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div
              className="col-span-full text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold mb-2">Aucun résultat trouvé</h3>
              <p className="text-muted-foreground">Essayez de modifier votre recherche</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSearchQuery('')}
              >
                Clear Search
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};