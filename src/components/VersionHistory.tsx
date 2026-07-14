import { motion } from 'motion/react';
import { History, Shield, CheckCircle, Flame, Clock } from 'lucide-react';
import { milestones } from '../data';

export default function VersionHistory() {
  const getStatusIcon = (status: 'released' | 'active' | 'scheduled') => {
    switch (status) {
      case 'released':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'active':
        return <Flame className="w-4 h-4 text-[#F7F2EF] animate-pulse" />;
      case 'scheduled':
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusLabelColor = (status: 'released' | 'active' | 'scheduled') => {
    switch (status) {
      case 'released':
        return 'text-green-400 border-green-500/20 bg-green-500/10';
      case 'active':
        return 'text-[#F7F2EF] border-[#6D0F1B]/30 bg-[#6D0F1B]/25';
      case 'scheduled':
        return 'text-gray-500 border-gray-800 bg-gray-900/10';
    }
  };

  return (
    <section id="version-history" className="w-full py-16 scroll-mt-24">
      {/* Module Title */}
      <div className="flex items-center gap-3 border-b border-[#6D0F1B]/30 pb-4 mb-8">
        <History className="w-6 h-6 text-[#6D0F1B]" />
        <h2 className="text-xl font-bold font-mono text-[#F7F2EF] tracking-wider uppercase">
          MODULE_07 // VERSION_HISTORY
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {milestones.map((mile) => {
          return (
            <div
              key={mile.version}
              className={`bg-[#141414]/50 backdrop-blur-md border rounded-lg p-5 flex flex-col justify-between gap-5 transition-all duration-300 relative overflow-hidden group ${
                mile.status === 'active' ? 'border-[#6D0F1B] shadow-md shadow-[#6D0F1B]/5' : 'border-gray-800'
              }`}
            >
              <div className="flex flex-col gap-3">
                {/* Header info */}
                <div className="flex justify-between items-center font-mono">
                  <span className="text-xs font-bold text-[#F7F2EF]">{mile.version}</span>
                  <span className="text-[10px] text-gray-500">{mile.date}</span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-200 font-sans group-hover:text-[#F7F2EF] transition-colors">
                    {mile.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans mt-1.5">
                    {mile.description}
                  </p>
                </div>
              </div>

              {/* Status footer */}
              <div className="border-t border-gray-800/40 pt-4 flex items-center justify-between font-mono text-[10px]">
                <span className="flex items-center gap-1.5 text-gray-500">
                  <Shield className="w-3.5 h-3.5 text-[#6D0F1B]" />
                  SYS_BUILD
                </span>

                <span className={`px-2 py-0.5 rounded border flex items-center gap-1 text-[8px] font-bold tracking-widest uppercase ${getStatusLabelColor(mile.status)}`}>
                  {getStatusIcon(mile.status)}
                  {mile.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
