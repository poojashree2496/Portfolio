import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, ChevronDown, ChevronUp, Github, ExternalLink, Network, Shield, HelpCircle, Zap } from 'lucide-react';
import { projects } from '../data';

export default function ProjectRepository() {
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>('aegis-net');

  const toggleExpand = (id: string) => {
    setExpandedProjectId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="projects" className="w-full py-16 scroll-mt-24">
      {/* Module Title */}
      <div className="flex items-center gap-3 border-b border-[#6D0F1B]/30 pb-4 mb-8">
        <Code2 className="w-6 h-6 text-[#6D0F1B]" />
        <h2 className="text-xl font-bold font-mono text-[#F7F2EF] tracking-wider uppercase">
          MODULE_02 // PROJECT_REPOSITORY
        </h2>
      </div>

      <div className="flex flex-col gap-6">
        {projects.map((proj) => {
          const isExpanded = expandedProjectId === proj.id;

          return (
            <div
              key={proj.id}
              className={`bg-[#141414]/50 backdrop-blur-md border rounded-lg overflow-hidden transition-all duration-300 ${
                isExpanded ? 'border-[#6D0F1B] shadow-lg shadow-[#6D0F1B]/5' : 'border-gray-800 hover:border-gray-700'
              }`}
            >
              {/* Card Header (Summary View) */}
              <div
                onClick={() => toggleExpand(proj.id)}
                className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 cursor-pointer hover:bg-gray-900/20 transition-all select-none"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="px-2 py-0.5 rounded bg-[#6D0F1B]/10 border border-[#6D0F1B]/20 text-[9px] font-mono text-[#F7F2EF] uppercase tracking-widest">
                      Active Repository
                    </span>
                    <span className="text-xs font-mono text-[#6D0F1B]">ID: {proj.id.toUpperCase()}</span>
                  </div>
                  <h3 className="text-base font-bold font-sans text-[#F7F2EF] tracking-tight group-hover:text-[#6D0F1B] transition-colors">
                    {proj.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-sans max-w-2xl mt-1.5 leading-relaxed">
                    {proj.overview}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0 font-mono">
                  {/* Technology Tags (Partial) */}
                  <div className="hidden lg:flex items-center gap-1.5">
                    {proj.technologies.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="px-2 py-1 rounded bg-[#0D0D0D] border border-gray-800 text-[10px] text-gray-400">
                        {tech}
                      </span>
                    ))}
                    {proj.technologies.length > 3 && (
                      <span className="text-[9px] text-gray-500 font-bold">+{proj.technologies.length - 3}</span>
                    )}
                  </div>

                  <button className="p-2 rounded bg-[#0D0D0D] border border-gray-800 text-gray-400 hover:text-white transition-colors">
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-[#6D0F1B]" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Card Expansion Area */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  >
                    <div className="border-t border-gray-800/80 p-6 flex flex-col gap-8 bg-[#0D0D0D]/60">
                      
                      {/* Grid containing Problem Statement and Solution */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Problem Statement */}
                        <div className="bg-[#141414]/70 p-5 rounded-lg border border-red-950/20 relative">
                          <div className="absolute top-3 right-3 opacity-20">
                            <HelpCircle className="w-8 h-8 text-[#6D0F1B]" />
                          </div>
                          <h4 className="text-xs font-mono text-[#6D0F1B] uppercase tracking-wider font-bold mb-2">
                            Problem Vector
                          </h4>
                          <p className="text-xs text-gray-300 leading-relaxed font-sans">
                            {proj.problemStatement}
                          </p>
                        </div>

                        {/* Solution Statement */}
                        <div className="bg-[#141414]/70 p-5 rounded-lg border border-green-950/20 relative">
                          <div className="absolute top-3 right-3 opacity-20">
                            <Zap className="w-8 h-8 text-[#6D0F1B]" />
                          </div>
                          <h4 className="text-xs font-mono text-[#6D0F1B] uppercase tracking-wider font-bold mb-2">
                            Engineered Solution
                          </h4>
                          <p className="text-xs text-gray-300 leading-relaxed font-sans">
                            {proj.solution}
                          </p>
                        </div>
                      </div>

                      {/* Stack Matrix & Link Controls */}
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div>
                            <h4 className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">Technical Matrix</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {proj.technologies.map((tech, idx) => (
                                <span key={idx} className="px-2 py-1 rounded bg-[#141414] border border-[#6D0F1B]/15 text-xs font-mono text-[#F7F2EF]">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0 font-mono">
                            {proj.githubLink && (
                              <a
                                href={proj.githubLink}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#141414] border border-gray-800 text-xs text-gray-300 hover:text-white hover:border-[#6D0F1B] transition-all"
                              >
                                <Github className="w-3.5 h-3.5" />
                                <span>REPOS_SRC</span>
                              </a>
                            )}
                            {proj.liveDemo && (
                              <a
                                href={proj.liveDemo}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#6D0F1B]/15 border border-[#6D0F1B]/30 text-xs text-[#F7F2EF] hover:bg-[#6D0F1B]/30 transition-all"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>LIVE_LINK</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Interactive Project Dependency Graph */}
                      <div className="bg-[#141414]/40 border border-gray-800/40 rounded-lg p-5 flex flex-col gap-4 relative overflow-hidden">
                        <div className="absolute top-3 right-3 text-[10px] font-mono text-gray-600 flex items-center gap-1">
                          <Network className="w-3.5 h-3.5 text-[#6D0F1B]" />
                          <span>TOPOLOGY_MAP</span>
                        </div>
                        <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider font-semibold">
                          System Dependencies Map
                        </h4>
                        
                        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 py-4 relative">
                          {/* Left node - The main project core */}
                          <div className="p-3 rounded bg-[#0D0D0D] border border-[#6D0F1B] text-center w-52 shadow-md relative z-10">
                            <span className="text-[10px] font-mono text-[#6D0F1B] uppercase tracking-wider block">Service Core</span>
                            <span className="text-xs font-bold text-[#F7F2EF] block truncate">{proj.name.split(':')[0]}</span>
                          </div>

                          {/* Desktop SVG Link vectors connecting Core to children */}
                          <div className="hidden lg:block absolute left-[35%] w-[30%] h-full pointer-events-none">
                            <svg className="w-full h-full">
                              <line x1="0%" y1="50%" x2="100%" y2="15%" stroke="#6D0F1B" strokeOpacity="0.3" strokeDasharray="4,4" />
                              <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="#6D0F1B" strokeOpacity="0.4" />
                              <line x1="0%" y1="50%" x2="100%" y2="85%" stroke="#6D0F1B" strokeOpacity="0.3" strokeDasharray="4,4" />
                            </svg>
                          </div>

                          {/* Right nodes - The dependencies */}
                          <div className="flex flex-col gap-3 w-56 relative z-10">
                            {proj.dependencies.map((dep) => (
                              <div key={dep.id} className="p-2.5 rounded bg-[#0D0D0D]/90 border border-gray-800 hover:border-[#6D0F1B]/30 transition-colors flex items-center gap-3">
                                <div className="p-1.5 rounded bg-[#141414] border border-gray-800">
                                  <Shield className="w-3.5 h-3.5 text-[#6D0F1B]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider block">{dep.type}</span>
                                  <span className="text-xs font-bold text-gray-300 block truncate">{dep.name}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Implementation Logs & Quantifiable Impact */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 border-t border-gray-800/40 pt-6">
                        {/* Implementation details */}
                        <div className="lg:col-span-7">
                          <h4 className="text-xs font-mono text-[#6D0F1B] uppercase tracking-wider font-bold mb-3">
                            Operational Tasks & Architecture Details
                          </h4>
                          <ul className="flex flex-col gap-2">
                            {proj.responsibilities.map((resp, idx) => (
                              <li key={idx} className="flex gap-2.5 text-xs text-gray-300 leading-relaxed font-sans">
                                <span className="text-[#6D0F1B] select-none font-bold font-mono">[{idx + 1}]</span>
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Impact details */}
                        <div className="lg:col-span-5">
                          <h4 className="text-xs font-mono text-[#6D0F1B] uppercase tracking-wider font-bold mb-3">
                            Quantifiable Impact Metrics
                          </h4>
                          <ul className="flex flex-col gap-3">
                            {proj.impact.map((imp, idx) => (
                              <li key={idx} className="bg-[#141414]/50 border border-gray-800/50 p-3 rounded-md flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#6D0F1B] shrink-0" />
                                <span className="text-xs font-mono text-gray-200 tracking-tight leading-normal">{imp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
