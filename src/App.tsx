import { useState, useEffect } from 'react';
import BackgroundEffect from './components/BackgroundEffect';
import LoadingScreen from './components/LoadingScreen';
import NavigationMap from './components/NavigationMap';
import CoreEngine from './components/CoreEngine';
import ProjectRepository from './components/ProjectRepository';
import TechnicalArsenal from './components/TechnicalArsenal';
import MissionLogs from './components/MissionLogs';
import LearningRepository from './components/LearningRepository';
import LeadershipEngine from './components/LeadershipEngine';
import VersionHistory from './components/VersionHistory';
import ContactTerminal from './components/ContactTerminal';
import { Cpu, Terminal, Clock, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [activeSection, setActiveSection] = useState('core-engine');
  const [systemTime, setSystemTime] = useState('');

  // Live system clock ticking (FITS technical/humble branding)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setSystemTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Keep the page at the top after the loading screen completes
  useEffect(() => {
    if (isInitialized) {
      // Force the viewport to the top immediately and guard against
      // layout-driven jumps by temporarily disabling smooth scroll
      const prevScrollBehavior = document.documentElement.style.scrollBehavior || '';
      document.documentElement.style.scrollBehavior = 'auto';
      // Clear any focused element which can cause the browser to scroll
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
      // Two attempts to snap to top to catch any late layout shifts
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      const snapTimer = window.setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }, 50);

      const restoreTimer = window.setTimeout(() => {
        document.documentElement.style.scrollBehavior = prevScrollBehavior;
      }, 300);

      return () => {
        clearTimeout(snapTimer);
        clearTimeout(restoreTimer);
        document.documentElement.style.scrollBehavior = prevScrollBehavior;
      };
    }
  }, [isInitialized]);

  // Intersection Observer to track scroll positions and update navigation map active state
  useEffect(() => {
    if (!isInitialized) return;

    const sections = [
      'core-engine',
      'projects',
      'skills',
      'experience',
      'certifications',
      'leadership',
      'version-history',
      'contact',
    ];

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // focused center-to-top segment
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isInitialized]);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isInitialized) {
    return <LoadingScreen onComplete={() => setIsInitialized(true)} />;
  }

  return (
    <div className="relative min-h-screen bg-[#0D0D0D] text-gray-300 font-sans selection:bg-[#6D0F1B]/40 selection:text-white">
      {/* Interactive Network / Data Packet Canvas Background */}
      <BackgroundEffect />

      {/* Top Floating HUD Status Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#0D0D0D]/75 backdrop-blur-md border-b border-[#6D0F1B]/15 px-4 md:px-8 py-3.5 flex items-center justify-between select-none font-mono">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded bg-[#6D0F1B]/10 border border-[#6D0F1B]/30 text-[#F7F2EF]">
            <Cpu className="w-4 h-4 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#F7F2EF] tracking-wider font-mono">Pooja Shree Ravichandar</span>
            <span className="text-[9px] text-gray-500 uppercase tracking-widest leading-none mt-0.5">Aspiring Software Engineer</span>
          </div>
        </div>

        {/* Live system clock & status lights */}
        <div className="flex items-center gap-6 text-xs text-gray-400">
          <div className="hidden lg:flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#6D0F1B]" />
            <span className="text-[10px] text-gray-300 font-mono tracking-widest">{systemTime}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-[10px] uppercase font-semibold text-green-500">STABLE_DEPLOY</span>
          </div>
        </div>
      </header>

      {/* Main Container Layout */}
      <main className="relative z-10 pt-20 px-4 md:px-8 max-w-6xl mx-auto flex flex-col gap-12 pb-24">
        
        {/* Hero Interactive Software Architecture Map Dashboard */}
        <section className="w-full pt-12 pb-6 flex flex-col items-center">
          <div className="text-center max-w-2xl flex flex-col items-center gap-3 mb-4">
            <div className="flex items-center gap-2 font-mono">
              <span className="h-px w-8 bg-[#6D0F1B]" />
              <span className="text-xs uppercase text-[#6D0F1B] tracking-widest font-bold">System Overview</span>
              <span className="h-px w-8 bg-[#6D0F1B]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-sans text-[#F7F2EF] tracking-tight">
              Welcome to my System
            </h1>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-sans">
              Explore my portfolio, technical projects, and professional journey.
            </p>
          </div>

          {/* Interactive Navigation Map Node diagram */}
          <NavigationMap activeSection={activeSection} onNavigate={handleNavigate} />
        </section>

        {/* Core Sections Stack */}
        <div className="flex flex-col gap-10">
          <CoreEngine />
          <ProjectRepository />
          <TechnicalArsenal />
          <MissionLogs />
          <LearningRepository />
          <LeadershipEngine />
          <VersionHistory />
          <ContactTerminal />
        </div>
      </main>

      {/* Compact footer */}
      <footer className="relative z-10 border-t border-gray-900 bg-[#0A0A0A]/80 backdrop-blur-sm py-8 text-center font-mono text-[10px] text-gray-600 select-none">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#6D0F1B]" />
            <span>SECURE SYSTEM INTEGRITY GUARANTEED</span>
          </div>
          <div className="flex items-center gap-1">
            <span>DESIGNED BY POOJA SHREE RAVICHANDAR</span>
            <Heart className="w-3 h-3 text-[#6D0F1B] fill-[#6D0F1B]" />
            <span>© 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
