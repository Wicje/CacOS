import React, { useState, useEffect } from 'react';
import { Sparkles, X, ArrowUp, Mic } from 'lucide-react';
import { sounds } from '../utils/sound';

interface AppleIntelligenceGlowProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp?: (appId: string) => void;
}

export const AppleIntelligenceGlow: React.FC<AppleIntelligenceGlowProps> = ({
  isOpen,
  onClose,
  onOpenApp
}) => {
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    sounds.playNotification();
    setIsProcessing(true);
    const query = prompt.toLowerCase();

    setTimeout(() => {
      setIsProcessing(false);
      if (query.includes('calc')) {
        setResponse('Opening Calculator for you.');
        onOpenApp?.('calculator');
      } else if (query.includes('note') || query.includes('write')) {
        setResponse('Created a note in your workspace.');
        onOpenApp?.('notes');
      } else if (query.includes('terminal') || query.includes('code')) {
        setResponse('Launching Terminal session.');
        onOpenApp?.('terminal');
      } else if (query.includes('safari') || query.includes('web')) {
        setResponse('Opening Safari browser.');
        onOpenApp?.('safari');
      } else {
        setResponse(`Lake Tahoe weather is 13°C and sunny. Your Sequoia workspace is running smoothly.`);
      }
    }, 800);
  };

  return (
    <>
      {/* 1. SEVERAL LAYERS OF APPLE INTELLIGENCE PERIMETER IRIDESCENT GLOW */}
      <div className="fixed inset-0 pointer-events-none z-[80] overflow-hidden">
        {/* Outer perimeter animated rainbow ring */}
        <div
          className="absolute inset-0 rounded-[28px] opacity-90 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: `
              inset 0 0 60px 8px rgba(168, 85, 247, 0.4),
              inset 0 0 100px 20px rgba(59, 130, 246, 0.35),
              inset 0 0 140px 40px rgba(236, 72, 153, 0.25)
            `
          }}
        />

        {/* Top & bottom vibrant edge caustics */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-amber-400 opacity-80 blur-[2px]" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-cyan-500 via-indigo-500 to-pink-500 opacity-80 blur-[2px]" />
        <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-80 blur-[2px]" />
        <div className="absolute top-0 bottom-0 right-0 w-1 bg-gradient-to-b from-amber-400 via-pink-500 to-indigo-500 opacity-80 blur-[2px]" />
      </div>

      {/* 2. FLOATING APPLE INTELLIGENCE SIRI CAPSULE */}
      <div
        className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[85] w-[460px] rounded-[26px] bg-slate-900/85 backdrop-blur-3xl border border-white/25 p-3.5 shadow-[0_25px_60px_rgba(0,0,0,0.6)] text-white select-none mac-specular-glass"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            {/* Glowing animated iridescent orb */}
            <div className="relative w-6 h-6 rounded-full bg-gradient-to-tr from-pink-500 via-indigo-500 to-cyan-400 flex items-center justify-center animate-spin shadow-[0_0_15px_rgba(236,72,153,0.7)]">
              <Sparkles size={12} className="text-white" />
            </div>
            <span className="text-[13px] font-semibold text-white tracking-tight">
              Apple Intelligence
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-5 h-5 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-[10px] text-white/80"
          >
            ✕
          </button>
        </div>

        {/* Prompt Input Form */}
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input
            type="text"
            autoFocus
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask anything or request an action..."
            className="w-full bg-white/10 border border-white/15 rounded-full px-4 py-2 pr-20 text-[13px] text-white placeholder-white/40 outline-none focus:border-purple-400/60 transition-colors"
          />

          <div className="absolute right-1.5 flex items-center gap-1">
            <button
              type="button"
              className="p-1 rounded-full text-white/50 hover:text-white transition-colors"
            >
              <Mic size={14} />
            </button>
            <button
              type="submit"
              className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 text-white flex items-center justify-center hover:scale-105 transition-transform"
            >
              <ArrowUp size={12} />
            </button>
          </div>
        </form>

        {/* AI Response or Suggestions */}
        {isProcessing && (
          <div className="flex items-center gap-2 mt-3 pt-2 text-[12px] text-purple-300">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            <span>Thinking...</span>
          </div>
        )}

        {response && !isProcessing && (
          <div className="mt-3 pt-2 text-[12px] text-white/90 bg-white/5 rounded-xl p-2.5 border border-white/10">
            {response}
          </div>
        )}

        {!response && !isProcessing && (
          <div className="flex items-center gap-2 mt-3 overflow-x-auto text-[11px] text-white/60">
            <span
              onClick={() => setPrompt('Open Calculator')}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 cursor-pointer whitespace-nowrap transition-colors"
            >
              Open Calculator
            </span>
            <span
              onClick={() => setPrompt('Create a new Note')}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 cursor-pointer whitespace-nowrap transition-colors"
            >
              Create a Note
            </span>
            <span
              onClick={() => setPrompt('Tahoe Weather update')}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 cursor-pointer whitespace-nowrap transition-colors"
            >
              Weather Update
            </span>
          </div>
        )}
      </div>
    </>
  );
};
