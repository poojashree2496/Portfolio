import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, Mail, Linkedin, Github, Trophy, MapPin, Phone, HelpCircle } from 'lucide-react';
import { contactInfo } from '../data';

interface CommandOutput {
  command: string;
  response: string | React.ReactNode;
}

export default function ContactTerminal() {
  const [terminalInput, setTerminalInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'systemctl status connectivity',
      response: (
        <div className="text-gray-400 font-mono text-xs">
          <p className="text-green-400 font-bold">[OK] CONNECTION PORTS STABLE AND ONLINE.</p>
          <p className="mt-1">Type <span className="text-[#6D0F1B] font-bold">help</span> to view available system queries, or execute shortcuts below.</p>
        </div>
      ),
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  // Prevent auto-scrolling on initial mount; only scroll when history updates after mount
  const hasMountedRef = useRef(false);
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    // Scroll terminal to bottom on new commands after initial render
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = terminalInput.trim().toLowerCase();
    if (!cleanCmd) return;

    let response: string | React.ReactNode = '';

    switch (cleanCmd) {
      case 'help':
        response = (
          <div className="flex flex-col gap-1 text-gray-400 font-mono text-xs">
            <p className="text-[#F7F2EF] font-bold">AVAILABLE SHELL COMMANDS:</p>
            <p><span className="text-[#6D0F1B] font-bold font-mono">about</span>      - Print professional operator identity profile</p>
            <p><span className="text-[#6D0F1B] font-bold font-mono">email</span>      - Retrieve secure direct email coordinates</p>
            <p><span className="text-[#6D0F1B] font-bold font-mono">phone</span>      - Output voice telecommunication digits</p>
            <p><span className="text-[#6D0F1B] font-bold font-mono">linkedin</span>   - Print encrypted LinkedIn profile node route</p>
            <p><span className="text-[#6D0F1B] font-bold font-mono">github</span>     - Fetch open-source GitHub repository module</p>
            <p><span className="text-[#6D0F1B] font-bold font-mono">leetcode</span>   - Yield algorithms training deck (LeetCode)</p>
            <p><span className="text-[#6D0F1B] font-bold font-mono">clear</span>      - Clear system query console history logs</p>
          </div>
        );
        break;
      case 'about':
        response = 'Pooja Shree Ravichandar is an Aspiring Software Engineer and Computer Science student with a passion for building efficient, secure, and scalable software solutions. Skilled in problem-solving, teamwork, and continuous learning through technical projects, leadership experiences, and hands-on exploration of emerging technologies.';
        break;
      case 'email':
        response = (
          <span>
            Email pipeline located: <a href={`mailto:${contactInfo.email}`} className="text-green-400 underline font-bold">{contactInfo.email}</a>
          </span>
        );
        break;
      case 'phone':
        response = `Direct voice route coordinates: ${contactInfo.phone}`;
        break;
      case 'linkedin':
        response = (
          <span>
            LinkedIn handshake module: <a href={contactInfo.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 underline font-bold">linkedin.com/in/poojashreeravichandar</a>
          </span>
        );
        break;
      case 'github':
        response = (
          <span>
            GitHub source code repository: <a href={contactInfo.github} target="_blank" rel="noreferrer" className="text-gray-200 underline font-bold">github.com/poojashreeravichandar</a>
          </span>
        );
        break;
      case 'leetcode':
        response = (
          <span>
            LeetCode algorithmic records: <a href={contactInfo.leetcode} target="_blank" rel="noreferrer" className="text-yellow-400 underline font-bold">leetcode.com/poojashreeravichandar</a>
          </span>
        );
        break;
      case 'clear':
        setHistory([]);
        setTerminalInput('');
        return;
      default:
        response = `Command error: '${cleanCmd}' represents an unrecognized instruction. Type 'help' to query valid operations.`;
    }

    setHistory((prev) => [...prev, { command: terminalInput, response }]);
    setTerminalInput('');
  };

  const handleShortcutCommand = (cmd: string) => {
    setTerminalInput(cmd);
    setTimeout(() => {
      // Simulate submission
      const mockEvent = { preventDefault: () => {} } as React.FormEvent;
      // trigger direct processing
      let resp: string | React.ReactNode = '';
      if (cmd === 'clear') {
        setHistory([]);
        setTerminalInput('');
        return;
      }
      if (cmd === 'help') {
        resp = (
          <div className="flex flex-col gap-1 text-gray-400 font-mono text-xs">
            <p className="text-[#F7F2EF] font-bold">AVAILABLE SHELL COMMANDS:</p>
            <p><span className="text-[#6D0F1B] font-bold font-mono">about</span>      - Print professional operator identity profile</p>
            <p><span className="text-[#6D0F1B] font-bold font-mono">email</span>      - Retrieve secure direct email coordinates</p>
            <p><span className="text-[#6D0F1B] font-bold font-mono">phone</span>      - Output voice telecommunication digits</p>
            <p><span className="text-[#6D0F1B] font-bold font-mono">linkedin</span>   - Print encrypted LinkedIn profile node route</p>
            <p><span className="text-[#6D0F1B] font-bold font-mono">github</span>     - Fetch open-source GitHub repository module</p>
            <p><span className="text-[#6D0F1B] font-bold font-mono">leetcode</span>   - Yield algorithms training deck (LeetCode)</p>
            <p><span className="text-[#6D0F1B] font-bold font-mono">clear</span>      - Clear system query console history logs</p>
          </div>
        );
      } else if (cmd === 'about') {
        resp = 'Pooja Shree Ravichandar is an Aspiring Software Engineer and Computer Science student with a passion for building efficient, secure, and scalable software solutions. Skilled in problem-solving, teamwork, and continuous learning through technical projects, leadership experiences, and hands-on exploration of emerging technologies.';
      } else if (cmd === 'email') {
        resp = (
          <span>
            Email pipeline located: <a href={`mailto:${contactInfo.email}`} className="text-green-400 underline font-bold">{contactInfo.email}</a>
          </span>
        );
      } else if (cmd === 'phone') {
        resp = `Direct voice route coordinates: ${contactInfo.phone}`;
      } else if (cmd === 'linkedin') {
        resp = (
          <span>
            LinkedIn handshake module: <a href={contactInfo.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 underline font-bold font-mono text-xs">linkedin.com/in/poojashreeravichandar</a>
          </span>
        );
      } else if (cmd === 'github') {
        resp = (
          <span>
            GitHub source code repository: <a href={contactInfo.github} target="_blank" rel="noreferrer" className="text-gray-200 underline font-bold font-mono text-xs">github.com/poojashreeravichandar</a>
          </span>
        );
      } else if (cmd === 'leetcode') {
        resp = (
          <span>
            LeetCode algorithmic records: <a href={contactInfo.leetcode} target="_blank" rel="noreferrer" className="text-yellow-400 underline font-bold font-mono text-xs">leetcode.com/poojashreeravichandar</a>
          </span>
        );
      }

      setHistory((prev) => [...prev, { command: cmd, response: resp }]);
      setTerminalInput('');
    }, 100);
  };

  return (
    <section id="contact" className="w-full py-16 scroll-mt-24">
      {/* Module Title */}
      <div className="flex items-center gap-3 border-b border-[#6D0F1B]/30 pb-4 mb-8">
        <Terminal className="w-6 h-6 text-[#6D0F1B]" />
        <h2 className="text-xl font-bold font-mono text-[#F7F2EF] tracking-wider uppercase">
          MODULE_08 // CONTACT_TERMINAL
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Connection details panel - 4 cols */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-[#141414]/50 backdrop-blur-md border border-gray-800 rounded-lg p-5 flex flex-col gap-5">
            <h3 className="text-xs font-mono text-[#6D0F1B] uppercase tracking-widest font-bold">System Connection Coordinates</h3>
            
            <div className="flex flex-col gap-4 font-sans text-xs">
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 text-gray-300 hover:text-[#F7F2EF] transition-colors">
                <div className="p-2 bg-[#0D0D0D] border border-gray-800 rounded">
                  <Mail className="w-4 h-4 text-[#6D0F1B]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 font-mono">DIRECT_EMAIL</span>
                  <span className="font-medium font-mono text-[11px] truncate">{contactInfo.email}</span>
                </div>
              </a>

              <div className="flex items-center gap-3 text-gray-300">
                <div className="p-2 bg-[#0D0D0D] border border-gray-800 rounded">
                  <Phone className="w-4 h-4 text-[#6D0F1B]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 font-mono">TELECOM_ROUTING</span>
                  <span className="font-medium font-mono text-[11px]">{contactInfo.phone}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-300">
                <div className="p-2 bg-[#0D0D0D] border border-gray-800 rounded">
                  <MapPin className="w-4 h-4 text-[#6D0F1B]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 font-mono">VESSEL_PORT</span>
                  <span className="font-medium font-mono text-[11px]">{contactInfo.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick link tiles */}
          <div className="grid grid-cols-3 gap-3">
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="bg-[#141414]/40 border border-gray-800 hover:border-[#6D0F1B]/30 hover:bg-[#6D0F1B]/5 rounded-lg p-3.5 flex flex-col items-center justify-center gap-2 transition-all text-gray-400 hover:text-white"
            >
              <Linkedin className="w-5 h-5 text-blue-400" />
              <span className="text-[9px] font-mono uppercase tracking-wider">LINKEDIN</span>
            </a>
            <a
              href={contactInfo.github}
              target="_blank"
              rel="noreferrer"
              className="bg-[#141414]/40 border border-gray-800 hover:border-[#6D0F1B]/30 hover:bg-[#6D0F1B]/5 rounded-lg p-3.5 flex flex-col items-center justify-center gap-2 transition-all text-gray-400 hover:text-white"
            >
              <Github className="w-5 h-5 text-gray-300" />
              <span className="text-[9px] font-mono uppercase tracking-wider">GITHUB</span>
            </a>
            <a
              href={contactInfo.leetcode}
              target="_blank"
              rel="noreferrer"
              className="bg-[#141414]/40 border border-gray-800 hover:border-[#6D0F1B]/30 hover:bg-[#6D0F1B]/5 rounded-lg p-3.5 flex flex-col items-center justify-center gap-2 transition-all text-gray-400 hover:text-white"
            >
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="text-[9px] font-mono uppercase tracking-wider">LEETCODE</span>
            </a>
          </div>
        </div>

        {/* Console window panel - 8 cols */}
        <div className="lg:col-span-8 flex flex-col bg-[#0D0D0D] border border-[#6D0F1B]/20 rounded-lg overflow-hidden shadow-2xl">
          {/* Header Bar */}
          <div className="bg-[#141414] border-b border-[#6D0F1B]/10 px-4 py-3 flex justify-between items-center select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
              <span className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30" />
              <span className="text-xs text-gray-400 font-mono ml-2">operator@pooja-shree-engine:~</span>
            </div>
            <span className="text-[9px] font-mono text-gray-600">BASH</span>
          </div>

          {/* Console Stream */}
          <div className="p-5 h-64 overflow-y-auto flex flex-col gap-3 font-mono text-xs">
            {history.map((hist, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-[#6D0F1B] font-bold">pooja@crimson-shell:~$</span>
                  <span>{hist.command}</span>
                </div>
                <div className="pl-4 text-gray-300 leading-relaxed">{hist.response}</div>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Console Input Bar */}
          <form onSubmit={handleCommandSubmit} className="bg-[#121212] border-t border-[#6D0F1B]/15 px-4 py-3 flex items-center gap-2">
            <span className="text-[#6D0F1B] font-mono font-bold text-xs shrink-0">pooja@crimson-shell:~$</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="TYPE_CMD_HERE... (e.g. help, email, linkedin, clear)"
              className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-[#F7F2EF] placeholder-gray-700"
            />
          </form>

          {/* Console Shortcut command chips */}
          <div className="bg-[#141414] px-4 py-3 border-t border-[#6D0F1B]/10 flex flex-wrap gap-2 items-center">
            <span className="text-[10px] text-gray-600 font-mono uppercase mr-1">Console Shortcuts:</span>
            {['help', 'about', 'email', 'linkedin', 'github', 'leetcode', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleShortcutCommand(cmd)}
                className="px-2.5 py-1 rounded bg-[#0D0D0D] border border-gray-800 hover:border-[#6D0F1B]/30 hover:text-[#F7F2EF] text-[10px] text-gray-400 font-mono transition-all"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
