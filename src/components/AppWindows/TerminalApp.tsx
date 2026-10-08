import React, { useState, useRef, useEffect } from 'react';
import { sounds } from '../../utils/sound';

interface TerminalAppProps {
  onClose: () => void;
  zIndex: number;
  onFocus: () => void;
}

export const TerminalApp: React.FC<TerminalAppProps> = ({ onClose, zIndex, onFocus }) => {
  const [history, setHistory] = useState<string[]>([
    'Last login: Tue Sep 16 09:43:22 on console',
    'Darwin Kernel Version 24.0.0: root:xnu-11215.1.10~1/RELEASE_ARM64_T8132',
    'Type "help" for a list of available commands.'
  ]);
  const [input, setInput] = useState('');
  const [position, setPosition] = useState({ x: 320, y: 160 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, posX: 320, posY: 160 });
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus();
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: position.x,
      posY: position.y
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: dragRef.current.posX + (e.clientX - dragRef.current.startX),
        y: Math.max(26, dragRef.current.posY + (e.clientY - dragRef.current.startY))
      });
    };
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    sounds.playClick();
    const cmd = input.trim();
    const newHist = [...history, `user@macbook-pro ~ % ${cmd}`];

    switch (cmd.toLowerCase()) {
      case 'help':
        newHist.push('Available commands: uname, sw_vers, ls, date, whoami, clear, echo [text]');
        break;
      case 'uname':
      case 'uname -a':
        newHist.push('Darwin macbook-pro 24.0.0 Darwin Kernel Version 24.0.0 arm64');
        break;
      case 'sw_vers':
        newHist.push('ProductName:   macOS\nProductVersion: 15.0 (Sequoia)\nBuildVersion:   24A335');
        break;
      case 'ls':
        newHist.push('Applications  Desktop  Documents  Downloads  Movies  Music  Pictures');
        break;
      case 'date':
        newHist.push('Tue Sep 16 09:43:29 PDT 2026');
        break;
      case 'whoami':
        newHist.push('user');
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        if (cmd.startsWith('echo ')) {
          newHist.push(cmd.substring(5));
        } else {
          newHist.push(`zsh: command not found: ${cmd}`);
        }
    }

    setHistory(newHist);
    setInput('');
  };

  return (
    <div
      onMouseDown={onFocus}
      style={{ left: `${position.x}px`, top: `${position.y}px`, zIndex }}
      className="fixed w-[580px] h-[360px] rounded-[18px] bg-[#1a1b26]/95 backdrop-blur-3xl shadow-2xl border border-white/20 text-white flex flex-col font-mono text-[13px] select-none overflow-hidden"
    >
      {/* Titlebar */}
      <div
        onMouseDown={handleMouseDown}
        className="h-9 border-b border-white/10 px-3 flex items-center justify-between cursor-default shrink-0 bg-neutral-900/60"
      >
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              sounds.playClose();
              onClose();
            }}
            className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]"
          />
          <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
          <button className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
        </div>
        <span className="text-[11px] font-sans text-white/50">user — zsh — 80×24</span>
        <div className="w-10" />
      </div>

      {/* Terminal View */}
      <div className="flex-1 p-3 overflow-y-auto font-mono text-[12px] leading-relaxed text-emerald-300">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">{line}</div>
        ))}

        <form onSubmit={handleCommand} className="flex items-center mt-1">
          <span className="text-white/70 mr-2">user@macbook-pro ~ %</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-emerald-300 outline-none font-mono text-[12px]"
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
