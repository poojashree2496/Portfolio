import { useState } from 'react';
import { motion } from 'motion/react';
import { Scroll, Terminal, Shield, Calendar, MapPin, Radio, Activity } from 'lucide-react';
import { missionLogs } from '../data';
import { LogEntry } from '../types';

export default function MissionLogs() {
  const [selectedType, setSelectedType] = useState<'All' | 'Internship' | 'Leadership' | 'Organization' | 'Affiliation'>('All');

  const filteredLogs = missionLogs.filter((log) => selectedType === 'All' || log.type === selectedType);

  const getStatusStyle = (status: LogEntry['status']) => {
    switch (status) {
      case 'Active':
        return 'text-green-400 border-green-500/20 bg-green-500/10';
      case 'Deployed':
        return 'text-[#F7F2EF] border-[#6D0F1B]/30 bg-[#6D0F1B]/15';
      case 'Archived':
        return 'text-gray-500 border-gray-800 bg-gray-900/10';
      default:
        return 'text-gray-400 border-gray-800 bg-gray-900/10';
    }
  };

  const getLogTypeLabel = (type: LogEntry['type']) => {
    switch (type) {
      case 'Internship':
        return 'SYS_INTEGRATION_LOG';
      case 'Leadership':
        return 'ORCHESTRATION_SERVICE_LOG';
      case 'Organization':
        return 'COMPILATION_ENV_LOG';
      case 'Affiliation':
        return 'EXTERNAL_NODE_LOG';
      default:
        return 'DEPLOY_LOG';
    }
  };

  return (
    <section id="experience" className="w-full py-16 scroll-mt-24">
      {/* Module Title */}
      <div className="flex items-center gap-3 border-b border-[#6D0F1B]/30 pb-4 mb-8">
        <Scroll className="w-6 h-6 text-[#6D0F1B]" />
        <h2 className="text-xl font-bold font-mono text-[#F7F2EF] tracking-wider uppercase">
          MODULE_04 // MISSION_LOGS
        </h2>
      </div>

      {/* Selector HUD */}
      <div className="flex flex-wrap gap-2 mb-8 font-mono">
        {(['All', 'Internship', 'Leadership', 'Organization', 'Affiliation'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-3 py-1.5 rounded text-xs select-none border transition-all ${
              selectedType === type
                ? 'bg-[#6D0F1B]/15 border-[#6D0F1B] text-[#F7F2EF]'
                : 'bg-transparent border-transparent text-gray-500 hover:text-gray-300'
            }`}
          >
            {type === 'All' ? 'ALL_LOGS' : type.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Terminal Timelines */}
      <div className="flex flex-col gap-6 relative pl-4 md:pl-8 border-l-2 border-gray-900">
        {filteredLogs.map((log, index) => {
          return (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-[#141414]/50 backdrop-blur-md border border-gray-800 hover:border-gray-700 rounded-lg p-6 flex flex-col gap-5 relative shadow-md"
            >
              {/* Orb node on the line */}
              <div className="absolute -left-[23px] md:-left-[39px] top-6 w-[10px] h-[10px] rounded-full border-2 border-[#6D0F1B] bg-[#0D0D0D] z-10 shadow-lg shadow-[#6D0F1B]" />

              {/* Log Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-gray-800/40 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5 font-mono">
                    <span className="text-[9px] text-[#6D0F1B] font-bold tracking-widest uppercase">
                      {getLogTypeLabel(log.type)}
                    </span>
                    <span className="text-gray-600 text-[10px]">•</span>
                    <span className="text-gray-500 text-[9px] uppercase tracking-wider">ID: {log.id}</span>
                  </div>
                  <h3 className="text-base font-bold font-sans text-[#F7F2EF] tracking-tight">
                    {log.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-400 mt-1">
                    <span className="flex items-center gap-1.5 text-gray-300 font-medium">
                      <Terminal className="w-3.5 h-3.5 text-[#6D0F1B]" />
                      {log.organization}
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-500">
                      <MapPin className="w-3.5 h-3.5" />
                      {log.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 font-mono">
                  <span className="flex items-center gap-1.5 text-[11px] text-gray-400">
                    <Calendar className="w-3.5 h-3.5 text-[#6D0F1B]" />
                    {log.timeline.toUpperCase()}
                  </span>

                  <span className={`px-2 py-0.5 rounded border text-[9px] font-bold tracking-wider uppercase ${getStatusStyle(log.status)}`}>
                    {log.status}
                  </span>
                </div>
              </div>

              {/* Log Details / Bullets */}
              <div className="flex flex-col gap-3 font-sans">
                <div className="text-[10px] text-gray-500 font-mono tracking-widest uppercase flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#6D0F1B]" />
                  <span>Executed Tasks & Responsibilities</span>
                </div>
                <div className="flex flex-col gap-2">
                  {log.description.map((bullet, idx) => (
                    <div key={idx} className="flex gap-3 items-start text-xs text-gray-300 leading-relaxed font-sans">
                      <span className="text-gray-600 font-mono select-none text-[10px] shrink-0 mt-0.5">
                        [{String(idx + 1).padStart(2, '0')}]
                      </span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer specs lines */}
              <div className="border-t border-gray-800/20 pt-4 flex justify-between text-[9px] text-gray-600 font-mono">
                <span className="flex items-center gap-1">
                  <Radio className="w-3 h-3 text-[#6D0F1B] animate-pulse" />
                  PIPELINE_STABLE_VERIFY
                </span>
                <span>COMPILED_LOG_SUCCESS</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
