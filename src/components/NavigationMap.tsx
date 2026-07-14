import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Cpu, Code2, Network, Scroll, Award, Terminal as TerminalIcon, Users } from 'lucide-react';

interface NavigationMapProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

interface MapNode {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  angle: number; // For radial distribution in desktop view
  x: number; // coordinates for layout
  y: number;
}

const mapNodes: MapNode[] = [
  { id: 'projects', label: 'Project Repository', icon: Code2, angle: -150, x: -160, y: -90 },
  { id: 'skills', label: 'Technical Arsenal', icon: Network, angle: -90, x: 0, y: -160 },
  { id: 'experience', label: 'Mission Logs', icon: Scroll, angle: -30, x: 160, y: -90 },
  { id: 'leadership', label: 'Leadership Engine', icon: Users, angle: 30, x: 160, y: 90 },
  { id: 'certifications', label: 'Learning Repository', icon: Award, angle: 90, x: 0, y: 160 },
  { id: 'contact', label: 'Contact Terminal', icon: TerminalIcon, angle: 150, x: -160, y: 90 },
];

export default function NavigationMap({ activeSection, onNavigate }: NavigationMapProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div id="interactive-nav-map" className="w-full flex flex-col items-center justify-center py-10 relative z-20">
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full border border-dashed border-[#6D0F1B] animate-[spin_100s_linear_infinite]" />
        <div className="w-[400px] h-[400px] rounded-full border border-[#4A0E16] absolute animate-[spin_60s_linear_infinite_reverse]" />
      </div>

      {isMobile ? (
        /* Mobile Layout: Linear Connection List representing architectural pipeline */
        <div className="flex flex-col gap-4 w-full max-w-sm px-4">
          {/* Mobile Central Core Node */}
          <div className="flex items-center gap-4 bg-[#141414] border border-[#6D0F1B] p-4 rounded-lg shadow-lg">
            <div className="p-3 bg-[#6D0F1B]/10 rounded border border-[#6D0F1B] text-[#F7F2EF]">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="text-xs text-[#6D0F1B] uppercase tracking-widest font-mono">System Hub</div>
              <div className="text-base font-bold text-[#F7F2EF] font-sans">Core Engine</div>
            </div>
          </div>

          {/* Connection Lines & Sub-Nodes */}
          <div className="flex flex-col pl-7 border-l-2 border-[#6D0F1B]/20 gap-4 mt-2">
            {mapNodes.map((node) => {
              const Icon = node.icon;
              const isActive = activeSection === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => onNavigate(node.id)}
                  className={`flex items-center gap-4 py-2 px-3 rounded border text-left font-mono transition-all duration-300 relative group w-full ${
                    isActive
                      ? 'bg-[#6D0F1B]/10 border-[#6D0F1B] text-[#F7F2EF]'
                      : 'bg-transparent border-transparent text-gray-400 hover:text-[#F7F2EF]'
                  }`}
                >
                  <div
                    className={`p-2 rounded border transition-all duration-300 ${
                      isActive ? 'bg-[#6D0F1B] border-[#6D0F1B] text-[#F7F2EF]' : 'bg-[#141414] border-gray-800 text-[#6D0F1B]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold block">{node.label}</span>
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest block font-mono">
                      {isActive ? 'Active Pipeline' : 'Connect Module'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* Desktop Layout: SVG-Connected Radial System Topology */
        <div className="relative w-[640px] h-[480px] flex items-center justify-center">
          {/* Connection Lines via SVGs */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {/* Defs for gradients/markers */}
            <defs>
              <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6D0F1B" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#F7F2EF" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Connecting lines from Center to Orbiting Nodes */}
            {mapNodes.map((node) => {
              const startX = 320;
              const startY = 240;
              const endX = 320 + node.x;
              const endY = 240 + node.y;
              const isHovered = hoveredNode === node.id;
              const isActive = activeSection === node.id;

              return (
                <g key={`link-${node.id}`}>
                  {/* Subtle static connection link */}
                  <line
                    x1={startX}
                    y1={startY}
                    x2={endX}
                    y2={endY}
                    stroke={isActive ? '#6D0F1B' : '#6D0F1B'}
                    strokeOpacity={isActive ? 0.7 : isHovered ? 0.4 : 0.15}
                    strokeWidth={isActive ? 1.5 : 1}
                    className="transition-all duration-300"
                  />

                  {/* Pulsating animated data packet */}
                  {(isActive || isHovered) && (
                    <circle r="3" fill="#F7F2EF">
                      <animateMotion
                        path={`M ${startX} ${startY} L ${endX} ${endY}`}
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Center node: Core Engine */}
          <div className="absolute z-10 flex flex-col items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => onNavigate('core-engine')}
              className={`p-6 rounded-full bg-[#141414] border-2 flex items-center justify-center cursor-pointer shadow-2xl relative transition-all duration-300 ${
                activeSection === 'core-engine' ? 'border-[#6D0F1B] shadow-[#6D0F1B]/10' : 'border-[#6D0F1B]/30'
              }`}
            >
              <Cpu className="w-8 h-8 text-[#F7F2EF] animate-pulse" />
              
              {/* Spinning active ring around the core */}
              <div className="absolute -inset-2 rounded-full border border-dashed border-[#6D0F1B]/20 animate-[spin_20s_linear_infinite]" />
            </motion.div>
            <div className="mt-3 text-center">
              <span className="text-[10px] text-[#6D0F1B] uppercase tracking-widest font-mono block">System Core</span>
              <span className="text-sm font-bold text-[#F7F2EF] font-mono tracking-wider">Core Engine</span>
            </div>
          </div>

          {/* Orbiting nodes: Subsystems */}
          {mapNodes.map((node) => {
            const Icon = node.icon;
            const isHovered = hoveredNode === node.id;
            const isActive = activeSection === node.id;

            return (
              <div
                key={node.id}
                style={{
                  position: 'absolute',
                  transform: `translate(${node.x}px, ${node.y}px)`,
                }}
                className="flex flex-col items-center z-10"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => onNavigate(node.id)}
                  className={`p-4 rounded-lg bg-[#141414] border transition-all duration-300 flex items-center justify-center shadow-lg cursor-pointer ${
                    isActive
                      ? 'border-[#6D0F1B] text-[#F7F2EF] bg-[#6D0F1B]/10 shadow-[#6D0F1B]/20'
                      : isHovered
                      ? 'border-[#6D0F1B]/60 text-[#F7F2EF]'
                      : 'border-gray-800 text-gray-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </motion.button>
                <span
                  className={`mt-2 font-mono text-[10px] tracking-wider transition-all duration-300 ${
                    isActive ? 'text-[#F7F2EF] font-bold' : isHovered ? 'text-gray-300' : 'text-gray-500'
                  }`}
                >
                  {node.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
