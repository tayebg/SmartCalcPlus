import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Sun, Moon, Menu, X, Calculator, FolderOpen, Play, Map, MessageCircle, FileText, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';

interface NavItem {
  name: string;
  path: string;
  icon: any;
  action?: string;
}

const navItems: NavItem[] = [
  { name: 'Calculations', path: '/calculs', icon: Calculator },
  { name: 'Drives', path: '/drives', icon: FolderOpen },
  { name: 'Videos', path: '/videos', icon: Play },
  { name: 'PFE', path: '#', icon: GraduationCap, action: 'pfe' },
  { name: 'Doctorat', path: '#', icon: GraduationCap, action: 'doctorat' },
  { name: 'Canevas', path: '/canevas', icon: FileText },
  { name: 'Notes', path: '/notes', icon: FileText },
  { name: 'Roadmap', path: '/roadmap', icon: Map },
  { name: 'Contact', path: '/contact', icon: MessageCircle },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPFEModal, setShowPFEModal] = useState(false);
  const [showDoctoratModal, setShowDoctoratModal] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ThemeIcon = theme === 'dark' ? Sun : Moon;

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        isScrolled 
          ? 'glass-navbar border-b border-border/50 shadow-elegant' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 w-full">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <NavLink to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center glow">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                SmartCalc+
              </span>
            </NavLink>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 flex-1 justify-center">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {(item.action === 'pfe' || item.action === 'doctorat') ? (
                  <button
                    onClick={() => item.action === 'pfe' ? setShowPFEModal(true) : setShowDoctoratModal(true)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-smooth icon-hover text-foreground hover:text-primary hover:bg-accent"
                  >
                    {item.icon && (
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <item.icon className="w-4 h-4" />
                      </motion.div>
                    )}
                    <span>{item.name}</span>
                  </button>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-smooth icon-hover ${
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-elegant'
                          : 'text-foreground hover:text-primary hover:bg-accent'
                      }`
                    }
                  >
                    {item.icon && (
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <item.icon className="w-4 h-4" />
                      </motion.div>
                    )}
                    <span>{item.name}</span>
                  </NavLink>
                )}
              </motion.div>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="relative overflow-hidden"
              >
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ThemeIcon className="w-5 h-5" />
                </motion.div>
              </Button>
            </motion.div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isOpen ? 'close' : 'open'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </motion.div>
                </AnimatePresence>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-elegant"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {(item.action === 'pfe' || item.action === 'doctorat') ? (
                    <button
                      onClick={() => {
                        if (item.action === 'pfe') setShowPFEModal(true);
                        else setShowDoctoratModal(true);
                        setIsOpen(false);
                      }}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-smooth text-foreground hover:text-primary hover:bg-accent w-full text-left"
                    >
                      {item.icon && (
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <item.icon className="w-5 h-5" />
                        </motion.div>
                      )}
                      <span>{item.name}</span>
                    </button>
                  ) : (
                    <NavLink
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-smooth ${
                          isActive
                            ? 'bg-primary text-primary-foreground shadow-elegant'
                            : 'text-foreground hover:text-primary hover:bg-accent'
                        }`
                      }
                    >
                      {item.icon && (
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <item.icon className="w-5 h-5" />
                        </motion.div>
                      )}
                      <span>{item.name}</span>
                    </NavLink>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* PFE Modal */}
      {showPFEModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-background border border-border rounded-lg max-w-md w-full p-6 shadow-2xl"
          >
            <div className="text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h2 className="text-2xl font-bold mb-4">Coming Soon...</h2>
              <p className="text-muted-foreground mb-6">
                The SmartCalc+ PFE section will soon showcase real-world final year projects for inspiration. Stay tuned!
              </p>
              <Button onClick={() => setShowPFEModal(false)} className="w-full">
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Doctorat Modal */}
      {showDoctoratModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-background border border-border rounded-lg max-w-md w-full p-6 shadow-2xl"
          >
            <div className="text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h2 className="text-2xl font-bold mb-4">Coming Soon...</h2>
              <p className="text-muted-foreground mb-6">
                The SmartCalc+ Doctorat section will soon showcase doctoral programs and calculation tools. Stay tuned!
              </p>
              <Button onClick={() => setShowDoctoratModal(false)} className="w-full">
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.nav>
  );
};