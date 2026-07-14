import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Shield, Cpu, Network, CheckCircle } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const steps = [
  { text: 'SYSTEM INITIALIZING...', icon: Cpu },
  { text: 'LOADING ENGINEER PROFILE [POOJA SHREE RAVICHANDAR]...', icon: Terminal },
  { text: 'ANALYZING TECHNICAL REPOSITORY AND COMPILING LIBRARIES...', icon: Shield },
  { text: 'ORCHESTRATING PROJECT DEPENDENCIES...', icon: Network },
  { text: 'COMPILING ARCHITECTURE MODULES...', icon: Cpu },
  { text: 'ACCESS GRANTED.', icon: CheckCircle },
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentStepIndex < steps.length) {
      const step = steps[currentStepIndex];
      const delay = currentStepIndex === steps.length - 1 ? 300 : Math.random() * 200 + 100;

      const timer = setTimeout(() => {
        setLogs((prev) => [...prev, `[OK] ${step.text}`]);
        setCurrentStepIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => {
        onComplete();
      }, 200);
      return () => clearTimeout(finalTimer);
    }
  }, [currentStepIndex, onComplete]);

  // Overall progress bar animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        id="system-loader-screen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0D0D0D] text-gray-300 font-mono p-4"
      >
        {/* Futuristic Background grid inside loader */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(109,15,27,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(109,15,27,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#6D0F1B] to-transparent animate-pulse" />

        <div className="w-full max-w-xl flex flex-col gap-6 relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-[#6D0F1B]/30 pb-4">
            <div className="w-3 h-3 rounded-full bg-[#6D0F1B] animate-ping" />
            <div className="flex flex-col">
              <span className="text-xs text-[#6D0F1B] font-semibold uppercase tracking-widest">Crimson Core Boot</span>
              <span className="text-xl font-bold text-[#F7F2EF] tracking-tight">CRIMSON_ARCHITECTURE_ENGINE v2.6</span>
            </div>
          </div>

          {/* Terminal Logs Window */}
          <div className="bg-[#141414] border border-[#6D0F1B]/20 rounded p-4 h-64 overflow-y-auto flex flex-col gap-2 shadow-2xl relative">
            <div className="absolute top-2 right-2 text-[10px] text-gray-500 font-mono">STABLE_BUILD</div>
            
            <AnimatePresence>
              {logs.map((log, index) => {
                const IconComponent = steps[Math.min(index, steps.length - 1)].icon;
                const isAccessGranted = log.includes('ACCESS GRANTED');
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`text-xs flex items-center gap-2 ${
                      isAccessGranted ? 'text-green-400 font-bold text-sm mt-2' : 'text-gray-400'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 ${isAccessGranted ? 'text-green-400' : 'text-[#6D0F1B]'}`} />
                    <span>{log}</span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            
            {currentStepIndex < steps.length && (
              <div className="flex items-center gap-2 text-xs text-[#6D0F1B] animate-pulse">
                <span className="w-2 h-4 bg-[#6D0F1B] inline-block" />
                <span>EXECUTE_STEP_{currentStepIndex + 1}...</span>
              </div>
            )}
          </div>

          {/* Loading Progress Bar */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-[11px] text-gray-400">
              <span className="tracking-widest">INITIALIZING REPOSITORIES</span>
              <span className="text-[#6D0F1B] font-bold">{Math.min(progress, 100)}%</span>
            </div>
            <div className="h-2 w-full bg-gray-900 border border-[#6D0F1B]/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-[#4A0E16] via-[#6D0F1B] to-[#F7F2EF]"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
