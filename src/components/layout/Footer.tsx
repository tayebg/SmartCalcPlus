import { motion } from 'framer-motion';
import { Calculator, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center glow">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                SmartCalc+
              </span>
            </motion.div>
            <p className="text-muted-foreground text-sm">
              The ultimate calculation tool for students and professionals.
            </p>
          </div>

           {/* Quick Links */}
           <div>
             <h3 className="font-semibold mb-4">Quick Links</h3>
             <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
               <Link to="/calculs" className="hover:text-primary transition-smooth">Calculations</Link>
               <Link to="/drives" className="hover:text-primary transition-smooth">Drives</Link>
               <Link to="/videos" className="hover:text-primary transition-smooth">Videos</Link>
               <Link to="/notes" className="hover:text-primary transition-smooth">Notes</Link>
               <Link to="/canevas" className="hover:text-primary transition-smooth">Canevas</Link>
               <Link to="/roadmap" className="hover:text-primary transition-smooth">Roadmap</Link>
               <Link to="/privacy" className="hover:text-primary transition-smooth">Privacy Policy</Link>
             </div>
           </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
               <motion.a
                 href="mailto:tayebekk2004@gmail.com"
                 className="text-muted-foreground hover:text-primary transition-smooth"
                 whileHover={{ scale: 1.2 }}
                 whileTap={{ scale: 0.9 }}
               >
                 <Mail className="w-5 h-5" />
               </motion.a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              className="flex flex-wrap items-center justify-center gap-1 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
               <span>Made with</span>
               <Heart className="w-4 h-4 text-red-500 animate-pulse" />
               <span>by </span>
               <a 
                 href="https://instagram.com/t04yeb" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="hover:text-primary transition-smooth"
               >
                 Bekkouche Tayeb
               </a>
               <span> & </span>
               <a 
                 href="https://instagram.com/ilyes_bkr_" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="hover:text-primary transition-smooth"
               >
                 Bakkar Ilyes
               </a>
               
            </motion.div>
<div className="text-sm text-muted-foreground mt-4 md:mt-0">
  © SmartCalc+. All rights reserved.
</div>
          </div>
        </div>
      </div>
    </footer>
  );
};