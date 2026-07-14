import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Network, Search, Cpu, CheckCircle2, Server, Star } from 'lucide-react';
import { skills } from '../data';
import { Skill } from '../types';

type CategoryFilter = 'All' | 'Languages' | 'Web Technologies' | 'Core CS' | 'Tools & Platforms';

export default function TechnicalArsenal() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [animateProgress, setAnimateProgress] = useState(false);

  useEffect(() => {
    // Trigger progress animation on load
    const timer = setTimeout(() => {
      setAnimateProgress(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories: CategoryFilter[] = ['All', 'Languages', 'Web Technologies', 'Core CS', 'Tools & Platforms'];

  const getStatusColor = (status: Skill['status']) => {
    switch (status) {
      case 'Optimized':
        return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'Operational':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'Active':
        return 'text-[#F7F2EF] bg-[#6D0F1B]/15 border-[#6D0F1B]/30';
      case 'Learning':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      default:
        return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <section id="skills" className="w-full py-16 scroll-mt-24">
      {/* Module Title */}
      <div className="flex items-center gap-3 border-b border-[#6D0F1B]/30 pb-4 mb-8">
        <Network className="w-6 h-6 text-[#6D0F1B]" />
        <h2 className="text-xl font-bold font-mono text-[#F7F2EF] tracking-wider uppercase">
          MODULE_03 // TECHNICAL_ARSENAL
        </h2>
      </div>

      {/* Filter and Search HUD */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-1.5 font-mono">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded text-xs transition-all duration-200 select-none ${
                selectedCategory === cat
                  ? 'bg-[#6D0F1B] text-[#F7F2EF] border border-[#6D0F1B]'
                  : 'bg-[#141414] text-gray-400 border border-transparent hover:border-[#6D0F1B]/20 hover:text-gray-200'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative font-mono w-full md:w-64">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="FILTER_BY_NAME..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#141414] border border-gray-800 focus:border-[#6D0F1B]/60 text-xs text-gray-300 rounded pl-10 pr-3 py-2 outline-none font-mono placeholder-gray-600 transition-all"
          />
        </div>
      </div>

      {/* Diagnostic Bento Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill) => (
          <div
            key={skill.name}
            className="bg-[#141414]/50 backdrop-blur-md border border-gray-800/80 hover:border-[#6D0F1B]/35 rounded-lg p-5 flex flex-col gap-4 shadow-md transition-all duration-300 relative group"
          >
            {/* Top Row: Skill Name & Category Icon */}
            <div className="flex justify-between items-start gap-4">
              <div>
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block mb-0.5">
                  {skill.category}
                </span>
                <h3 className="text-sm font-bold text-[#F7F2EF] font-sans group-hover:text-white">
                  {skill.name}
                </h3>
              </div>

              {/* Status Pill */}
              <span className={`px-2 py-0.5 rounded border text-[8px] font-mono font-bold tracking-widest uppercase ${getStatusColor(skill.status)}`}>
                {skill.status}
              </span>
            </div>

            {/* Diagnostic Progress Loading Bar */}
            <div className="flex flex-col gap-1.5 font-mono">
              <div className="flex justify-between text-[10px] text-gray-500">
                <span>COMPILATION_INTEGRITY</span>
                <span className="text-gray-300 font-bold">{skill.value}%</span>
              </div>
              <div className="h-1.5 w-full bg-[#0D0D0D] border border-gray-800 rounded-full overflow-hidden">
                <div
                  style={{
                    width: animateProgress ? `${skill.value}%` : '0%',
                    transition: 'width 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="h-full bg-gradient-to-r from-[#4A0E16] via-[#6D0F1B] to-[#F7F2EF]/60 rounded-full"
                />
              </div>
            </div>

            {/* Micro Details (Subtle design lines) */}
            <div className="border-t border-gray-800/30 pt-3 flex justify-between items-center text-[9px] text-gray-500 font-mono">
              <span className="flex items-center gap-1">
                <Cpu className="w-3 h-3 text-[#6D0F1B]" />
                REG_OK
              </span>
              <span>STATE: STABLE_BUILD</span>
            </div>
          </div>
        ))}

        {filteredSkills.length === 0 && (
          <div className="col-span-full py-16 text-center border border-dashed border-gray-800 rounded-lg">
            <span className="text-xs font-mono text-gray-500">
              [ERROR] NO ARSENAL MODULE MATCHES SEARCH OR CATEGORY CRITERIA.
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
