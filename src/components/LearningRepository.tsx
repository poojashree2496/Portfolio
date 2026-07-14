import { motion } from 'motion/react';
import { Award, ShieldCheck, Cpu, Key, ExternalLink } from 'lucide-react';
import { certifications } from '../data';

export default function LearningRepository() {
  return (
    <section id="certifications" className="w-full py-16 scroll-mt-24">
      {/* Module Title */}
      <div className="flex items-center gap-3 border-b border-[#6D0F1B]/30 pb-4 mb-8">
        <Award className="w-6 h-6 text-[#6D0F1B]" />
        <h2 className="text-xl font-bold font-mono text-[#F7F2EF] tracking-wider uppercase">
          MODULE_05 // LEARNING_REPOSITORY
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert) => {
          const isVerified = cert.status === 'Verified';

          return (
            <div
              key={cert.id}
              className={`bg-[#141414]/50 backdrop-blur-md border rounded-lg p-5 flex flex-col justify-between gap-5 transition-all duration-300 shadow-md ${
                isVerified ? 'border-gray-800 hover:border-[#6D0F1B]/40' : 'border-gray-800/40 opacity-80'
              }`}
            >
              {/* Header */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start gap-3">
                  <span className="text-[9px] font-mono text-[#6D0F1B] uppercase tracking-widest block font-bold">
                    Credential module
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded border text-[8px] font-mono font-bold tracking-widest uppercase ${
                      isVerified
                        ? 'text-green-400 bg-green-500/10 border-green-500/20'
                        : 'text-amber-400 bg-amber-500/10 border-amber-500/20 animate-pulse'
                    }`}
                  >
                    {cert.status}
                  </span>
                </div>
                
                <h3 className="text-sm font-bold text-[#F7F2EF] font-sans leading-snug">
                  {cert.name}
                </h3>
                <span className="text-[11px] font-mono text-gray-400">
                  Issuer: {cert.issuer} ({cert.date})
                </span>
              </div>

              {/* Unlocked Capabilities */}
              <div className="flex flex-col gap-2">
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">
                  Unlocked Capabilities
                </span>
                <div className="flex flex-wrap gap-1">
                  {cert.skillsUnlocked.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-[#0D0D0D] border border-gray-900 text-[10px] font-mono text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verification specs / Cryptographic signature */}
              <div className="border-t border-gray-800/40 pt-4 flex items-center justify-between font-mono text-[9px] text-gray-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#6D0F1B]" />
                  {cert.verificationId ? `SIGN_ID: ${cert.verificationId}` : 'PENDING_SIG_GEN'}
                </span>
                <span className="text-gray-600">STABLE</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
