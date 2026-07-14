import { motion } from 'motion/react';
import { Users, Cpu, ShieldAlert, BookOpen, Presentation, Code } from 'lucide-react';
import { missionLogs } from '../data';

export default function LeadershipEngine() {
  // Extract leadership/coordinator posts from mission logs
  const leadershipLogs = missionLogs.filter((log) => log.type === 'Leadership' || log.type === 'Organization');

  return (
    <section id="leadership" className="w-full py-16 scroll-mt-24">
      {/* Module Title */}
      <div className="flex items-center gap-3 border-b border-[#6D0F1B]/30 pb-4 mb-8">
        <Users className="w-6 h-6 text-[#6D0F1B]" />
        <h2 className="text-xl font-bold font-mono text-[#F7F2EF] tracking-wider uppercase">
          MODULE_06 // LEADERSHIP_ENGINE
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {leadershipLogs.map((lead) => {
          return (
            <div
              key={lead.id}
              className="bg-[#141414]/50 backdrop-blur-md border border-gray-800 hover:border-[#6D0F1B]/40 rounded-lg p-6 flex flex-col gap-5 transition-all duration-300 shadow-md relative overflow-hidden group"
            >
              {/* Top ambient color ring inside card */}
              <div className="absolute top-0 left-0 w-2 h-full bg-[#6D0F1B]" />

              <div className="flex justify-between items-start pl-2">
                <div>
                  <span className="text-[9px] font-mono text-[#6D0F1B] uppercase tracking-widest block font-bold mb-1">
                    Orchestration Service Node
                  </span>
                  <h3 className="text-base font-bold font-sans text-[#F7F2EF] tracking-tight">
                    {lead.role}
                  </h3>
                  <span className="text-xs font-mono text-gray-400">
                    {lead.organization}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-gray-500 whitespace-nowrap">
                  {lead.timeline}
                </span>
              </div>

              {/* Training logs / items */}
              <div className="flex flex-col gap-3.5 pl-2 font-sans">
                {lead.description.map((bullet, idx) => {
                  return (
                    <div key={idx} className="flex gap-3 items-start text-xs text-gray-300 leading-relaxed font-sans">
                      <div className="p-1 rounded bg-[#0D0D0D] border border-gray-800 mt-0.5">
                        <Code className="w-3.5 h-3.5 text-[#6D0F1B]" />
                      </div>
                      <span>{bullet}</span>
                    </div>
                  );
                })}
              </div>

              {/* Status specs */}
              <div className="border-t border-gray-800/20 pt-4 flex justify-between text-[9px] text-gray-500 font-mono pl-2">
                <span>COORD: STABLE_DEPLOY</span>
                <span className="text-[#6D0F1B] font-bold">NODE: VERIFIED</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
