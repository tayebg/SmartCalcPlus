import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  BookOpen, 
  Zap, 
  Target,
  Calendar,
  Users,
  TrendingUp
} from 'lucide-react';

const roadmapItems = [
  {
    id: 1,
    phase: 'Phase 1',
    title: 'Foundation Launch',
    status: 'completed',
    date: 'Q1 2024',
    description: 'Core calculation tools and basic UI',
    features: [
      'Basic arithmetic operations',
      'Level-based navigation',
      'Responsive design',
      'Dark/Light mode'
    ]
  },
  {
    id: 2,
    phase: 'Phase 2',
    title: 'Enhanced Features',
    status: 'in-progress',
    date: 'Q2 2024',
    description: 'Advanced calculations and resource library',
    features: [
      'Complex mathematical functions',
      'File library system',
      'Video tutorials',
      'User authentication'
    ]
  },
  {
    id: 3,
    phase: 'Phase 3',
    title: 'AI Integration',
    status: 'planned',
    date: 'Q3 2024',
    description: 'Smart assistance and personalized learning',
    features: [
      'AI-powered calculation suggestions',
      'Personalized learning paths',
      'Smart problem solving',
      'Automated homework help'
    ]
  },
  {
    id: 4,
    phase: 'Phase 4',
    title: 'Community Platform',
    status: 'planned',
    date: 'Q4 2024',
    description: 'Collaborative learning and social features',
    features: [
      'Student communities',
      'Peer-to-peer tutoring',
      'Study groups',
      'Achievement system'
    ]
  },
  {
    id: 5,
    phase: 'Phase 5',
    title: 'Advanced Analytics',
    status: 'future',
    date: 'Q1 2025',
    description: 'Performance tracking and insights',
    features: [
      'Learning analytics',
      'Progress tracking',
      'Performance insights',
      'Predictive modeling'
    ]
  },
  {
    id: 6,
    phase: 'Phase 6',
    title: 'Mobile Excellence',
    status: 'future',
    date: 'Q2 2025',
    description: 'Native mobile apps and offline capabilities',
    features: [
      'Native iOS/Android apps',
      'Offline functionality',
      'Mobile-first design',
      'Push notifications'
    ]
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-6 h-6 text-success" />;
    case 'in-progress':
      return <Clock className="w-6 h-6 text-primary animate-pulse" />;
    case 'planned':
      return <Circle className="w-6 h-6 text-muted-foreground" />;
    case 'future':
      return <Circle className="w-6 h-6 text-muted-foreground/50" />;
    default:
      return <Circle className="w-6 h-6 text-muted-foreground" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-success/10 text-success border-success/20';
    case 'in-progress':
      return 'bg-primary/10 text-primary border-primary/20';
    case 'planned':
      return 'bg-muted/50 text-muted-foreground border-muted-foreground/20';
    case 'future':
      return 'bg-muted/30 text-muted-foreground/70 border-muted-foreground/10';
    default:
      return 'bg-muted/50 text-muted-foreground border-muted-foreground/20';
  }
};

const stats = [
  { label: 'Total Features', value: '24+', icon: Target },
  { label: 'Phases Completed', value: '1/6', icon: CheckCircle },
  { label: 'In Development', value: '4', icon: Clock },
  { label: 'Expected Users', value: '100K+', icon: Users },
];

export const Roadmap = () => {
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
          <h1 className="text-4xl font-bold mb-4">Development Roadmap</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our journey to building the ultimate educational calculation platform. 
            Transparent development with clear milestones and exciting features.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 text-center hover:shadow-elegant transition-smooth">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Roadmap Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform md:-translate-x-0.5" />

          <div className="space-y-12">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={item.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
              >
                {/* Timeline Node */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-background border-4 border-primary rounded-full transform md:-translate-x-1/2 flex items-center justify-center z-10">
                  {getStatusIcon(item.status)}
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                }`}>
                  <Card className="p-6 hover:shadow-elegant transition-smooth">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <Badge className={`mb-2 ${getStatusColor(item.status)}`}>
                          {item.phase}
                        </Badge>
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground mb-4">{item.description}</p>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{item.date}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium flex items-center space-x-2">
                        <BookOpen className="w-4 h-4" />
                        <span>Key Features</span>
                      </h4>
                      <ul className="space-y-1">
                        {item.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-center space-x-2 text-sm text-muted-foreground"
                          >
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {item.status === 'completed' && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="flex items-center space-x-2 text-sm text-success">
                          <CheckCircle className="w-4 h-4" />
                          <span>Completed & Live</span>
                        </div>
                      </div>
                    )}

                    {item.status === 'in-progress' && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-sm text-primary">
                            <Zap className="w-4 h-4" />
                            <span>In Development</span>
                          </div>
                          <div className="w-1/2 bg-muted rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full w-3/4 animate-pulse" />
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16 p-8 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-muted-foreground mb-6">
            Be part of the SmartCalc+ community and help us shape the future of educational technology.
          </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Button 
               variant="gradient" 
               size="lg"
               onClick={() => {
                 navigator.clipboard.writeText('https://github.com/tayebg/smartcalc-plus');
                 // toast notification would go here
               }}
             >
               <TrendingUp className="w-5 h-5 mr-2" />
               Follow Progress
             </Button>
             <Button 
               variant="outline" 
               size="lg"
               onClick={() => {
                 navigator.clipboard.writeText('Discord link coming soon!');
                 // toast notification would go here
               }}
             >
               <Users className="w-5 h-5 mr-2" />
               Join Community
             </Button>
           </div>
        </motion.div>
      </div>
    </div>
  );
};