import { motion } from 'motion/react';
import { Cpu, Terminal, ShieldAlert, CpuIcon, CheckSquare } from 'lucide-react';
import { systemProfile } from '../data';

export default function CoreEngine() {
  return (
    <section id="core-engine" className="w-full py-16 scroll-mt-24">
      {/* Module Title */}
      <div className="flex items-center gap-3 border-b border-[#6D0F1B]/30 pb-4 mb-8">
        <Cpu className="w-6 h-6 text-[#6D0F1B]" />
        <h2 className="text-xl font-bold font-mono text-[#F7F2EF] tracking-wider uppercase">
          MODULE_01 // CORE_ENGINE
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Core Profile Card - 5 cols */}
        <div className="lg:col-span-5 bg-[#141414]/80 backdrop-blur-md border border-[#6D0F1B]/20 rounded-lg p-6 flex flex-col gap-6 relative shadow-xl overflow-hidden group">
          <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-gradient-to-br from-[#6D0F1B]/10 to-transparent rounded-bl-full pointer-events-none" />
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded bg-[#6D0F1B]/10 border border-[#6D0F1B]/30 flex items-center justify-center">
              <Terminal className="w-6 h-6 text-[#F7F2EF]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-[#6D0F1B] uppercase tracking-widest font-bold">Systems Operator</span>
              <h1 className="text-lg font-bold font-sans text-[#F7F2EF] tracking-tight">Pooja Shree Ravichandar</h1>
              <span className="text-xs font-mono text-gray-400">Aspiring Software Engineer</span>
            </div>
          </div>

          <div className="border-t border-gray-800/60 pt-4 flex flex-col gap-4">
            {/* Spec lines */}
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-gray-500 uppercase">System Name</span>
              <span className="text-[#F7F2EF] font-bold">{systemProfile.name}</span>
            </div>
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-gray-500 uppercase">Version State</span>
              <span className="text-[#6D0F1B] font-bold">{systemProfile.version}</span>
            </div>
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-gray-500 uppercase">Vessel Location</span>
              <span className="text-gray-300">Ooty, India</span>
            </div>
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-gray-500 uppercase">Status Signal</span>
              <span className="text-green-500 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Active Core
              </span>
            </div>
          </div>

          <div className="mt-2 bg-[#0F0F0F] border border-[#6D0F1B]/10 rounded p-3 font-mono">
            <div className="text-[10px] text-gray-500 mb-1 uppercase tracking-wider">Current Stack Focus:</div>
            <div className="text-xs text-[#F7F2EF] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#6D0F1B]" />
              <span>Full-Stack Web Development, Blockchain, UI/UX Design</span>
            </div>
          </div>
        </div>

        {/* Detailed specs - 7 cols */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Mission & Values */}
          <div className="bg-[#141414]/50 backdrop-blur-md border border-gray-800/80 rounded-lg p-6 flex flex-col gap-4">
            <h3 className="text-xs font-mono text-[#6D0F1B] uppercase tracking-widest font-bold">SYSTEM_MISSION</h3>
            <p className="text-sm text-gray-300 leading-relaxed font-sans">
              &ldquo;{systemProfile.missionStatement}&rdquo;
            </p>
          </div>

          {/* Primary Functions Checklist */}
          <div className="bg-[#141414]/50 backdrop-blur-md border border-gray-800/80 rounded-lg p-6">
            <h3 className="text-xs font-mono text-[#6D0F1B] uppercase tracking-widest font-bold mb-4">Core Operating Functions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {systemProfile.primaryFunctions.map((func, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-[#0F0F0F] border border-gray-900 rounded p-3 transition-colors hover:border-[#6D0F1B]/20">
                  <CheckSquare className="w-4 h-4 text-[#6D0F1B] shrink-0 mt-0.5" />
                  <span className="text-xs font-mono text-gray-300 leading-tight">{func}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Research / Tech Interests */}
          <div className="bg-[#141414]/50 backdrop-blur-md border border-gray-800/80 rounded-lg p-6">
            <h3 className="text-xs font-mono text-[#6D0F1B] uppercase tracking-widest font-bold mb-4">Target Research Areas</h3>
            <div className="flex flex-wrap gap-2">
              {systemProfile.technicalInterests.map((interest, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded bg-[#0F0F0F] border border-[#6D0F1B]/10 text-xs font-mono text-gray-300 hover:border-[#6D0F1B]/30 hover:text-[#F7F2EF] transition-all"
                >
                  {interest}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
