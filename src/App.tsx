import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SplashScreen } from '@/components/SplashScreen';


// Pages
import { Home } from "./pages/Home";
import { Calculations } from "./pages/Calculations";
import { LevelPage } from "./pages/LevelPage";
import { SpecializationPage } from "./pages/SpecializationPage";
import { Drives } from "./pages/Drives";
import { DriveDetails } from "./pages/DriveDetails";
import { Videos } from "./pages/Videos";
import { VideoGallery } from "./pages/VideoGallery";
import { Canevas } from "./pages/Canevas";
import { Roadmap } from "./pages/Roadmap";
import { Contact } from "./pages/Contact";
import { Notes } from "./pages/Notes";
import { Tutorials } from "./pages/Tutorials";
import { Community } from "./pages/Community";
import { Offline } from "./pages/Offline";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/Privacy";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        <SplashScreen 
          isVisible={showSplash} 
          onComplete={() => setShowSplash(false)} 
        />

        {!showSplash && (
          <BrowserRouter>
            <div className="min-h-screen bg-background text-foreground">
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/calculs" element={<Calculations />} />
                  <Route path="/calculs/licence/:level" element={<LevelPage />} />
                  <Route path="/calculs/master/:level" element={<LevelPage />} />
                  <Route path="/calculs/doctorat" element={<LevelPage />} />
                  <Route path="/calculs/ingenieurs" element={<LevelPage />} />
                  <Route path="/calculs/licence/:level/:specialization" element={<SpecializationPage />} />
                  <Route path="/calculs/master/:level/:specialization" element={<SpecializationPage />} />
                   <Route path="/drives" element={<Drives />} />
                   <Route path="/drives/:driveId" element={<DriveDetails />} />
                   <Route path="/videos" element={<Videos />} />
                   <Route path="/videos/:specializationId" element={<VideoGallery />} />
                    <Route path="/canevas" element={<Canevas />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/notes" element={<Notes />} />
                   <Route path="/contact" element={<Contact />} />
                   <Route path="/tutorials" element={<Tutorials />} />
                   <Route path="/community" element={<Community />} />
                   <Route path="/offline" element={<Offline />} />
                   <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              
            </div>
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
