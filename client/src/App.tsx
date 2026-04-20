import { lazy, Suspense, useState, useCallback } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { Preloader } from "@/components/Preloader";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { ScrollProgress } from "@/components/ScrollProgress";

import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Lazy load page components for better initial load performance
const Home = lazy(() => import("@/pages/Home"));
const Services = lazy(() => import("@/pages/Services"));
const About = lazy(() => import("@/pages/About"));
const WhyUs = lazy(() => import("@/pages/WhyUs"));
const Careers = lazy(() => import("@/pages/Careers"));
const Blog = lazy(() => import("@/pages/Blog"));
const NotFound = lazy(() => import("@/pages/not-found"));
const WebPentesting = lazy(() => import("./pages/services/WebPentesting.tsx"));
const MobileSecurity = lazy(() => import("./pages/services/MobileSecurity.tsx"));
const NetworkSecurity = lazy(() => import("./pages/services/NetworkSecurity.tsx"));
const ServicePlaceholder = lazy(() => import("./pages/services/ServicePlaceholder.tsx"));
const ApiSecurity = lazy(() => import("./pages/services/ApiSecurity.tsx"));
const CloudSecurity = lazy(() => import("./pages/services/CloudSecurity.tsx"));
const DevSecOps = lazy(() => import("./pages/services/DevSecOps.tsx"));
const DigitalForensics = lazy(() => import("./pages/services/DigitalForensics.tsx"));
const IncidentResponse = lazy(() => import("./pages/services/IncidentResponse.tsx"));
const MalwareAnalysis = lazy(() => import("./pages/services/MalwareAnalysis.tsx"));
const ComplianceAudit = lazy(() => import("./pages/services/ComplianceAudit.tsx"));
const TrainingAwareness = lazy(() => import("./pages/services/TrainingAwareness.tsx"));
import { ThreeCanvas } from "@/components/ThreeCanvas";
import { ThreeBackground } from "@/components/ThreeBackground";
import { GlowCursor } from "@/components/GlowCursor";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AIAssistant } from "@/components/AIAssistant";

function LoadingState() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020202]">
      <div className="relative w-48 h-[1px] bg-white/10 overflow-hidden rounded-full">
        <div className="absolute inset-0 bg-white animate-loading-bar" />
      </div>
      <div className="mt-6 text-[9px] font-mono font-bold tracking-[0.3em] uppercase text-white/30 animate-pulse">
        Loading Module
      </div>
    </div>
  );
}

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <div key={location} className="w-full h-full">
        <Suspense fallback={<LoadingState />}>
          <PageTransition>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/services" component={Services} />
              <Route path="/about" component={About} />
              <Route path="/why-us" component={WhyUs} />
              <Route path="/careers" component={Careers} />
              <Route path="/blog" component={Blog} />
              
              {/* Service Sub-pages */}
              <Route path="/services/web-app-pentesting" component={WebPentesting} />
              <Route path="/services/mobile-security" component={MobileSecurity} />
              <Route path="/services/network-security" component={NetworkSecurity} />
              <Route path="/services/api-security" component={ApiSecurity} />
              <Route path="/services/cloud-security" component={CloudSecurity} />
              <Route path="/services/devsecops" component={DevSecOps} />
              <Route path="/services/digital-forensics" component={DigitalForensics} />
              <Route path="/services/incident-response" component={IncidentResponse} />
              <Route path="/services/malware-analysis" component={MalwareAnalysis} />
              <Route path="/services/compliance-audit" component={ComplianceAudit} />
              <Route path="/services/training-awareness" component={TrainingAwareness} />
              <Route component={NotFound} />
            </Switch>
          </PageTransition>
        </Suspense>
      </div>
    </AnimatePresence>
  );
}

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // Check session storage immediately to avoid flash
  const alreadyLoaded = typeof window !== 'undefined' && sessionStorage.getItem("secventra-loaded");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Cinematic Preloader */}
        {!alreadyLoaded && !isLoaded && (
          <Preloader onComplete={handlePreloaderComplete} />
        )}

        {/* Film Grain Overlay */}
        <NoiseOverlay />

        {/* Scroll Progress Bar */}
        <ScrollProgress />

        {/* Global Persistent 3D Particle Background */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
          <ThreeCanvas camera={{ position: [0, 0, 10], fov: 45 }} controls={false}>
            <ThreeBackground />
          </ThreeCanvas>
        </div>

        <ScrollToTop />
        <AIAssistant />

        <div className="min-h-screen bg-transparent text-foreground relative selection:bg-[#ffffff]/15">
          <Navigation />
          <GlowCursor />
          <main className="relative z-[5]">
            <Router />
          </main>
          
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
