import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Camera,
  Settings,
  Sparkles,
  Calendar as CalendarIcon,
  CheckCircle,
  Inbox,
  Lightbulb,
  X,
  FileCode,
  Layers
} from 'lucide-react';
import { sounds } from '../utils/sound';
import lupineImg from '../assets/images/lupine_album_1791426996452.jpg';
import westEndBluesImg from '../assets/images/west_end_blues_1791427010247.jpg';

export type NotchState = 'collapsed' | 'wide' | 'compact' | 'activity' | 'mirror';

interface MacNotchProps {
  onOpenApp?: (appId: string) => void;
}

export const MacNotch: React.FC<MacNotchProps> = ({ onOpenApp }) => {
  // Current active notch state (default to wide matching notch1.jpg)
  const [notchState, setNotchState] = useState<NotchState>('wide');
  const [activeTab, setActiveTab] = useState<'nook' | 'tray'>('nook');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMirrorActive, setIsMirrorActive] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle webcam video stream when in mirror state
  useEffect(() => {
    let stream: MediaStream | null = null;
    if (notchState === 'mirror') {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: { width: 320, height: 240, facingMode: 'user' } })
          .then((s) => {
            stream = s;
            setHasCameraPermission(true);
            if (videoRef.current) {
              videoRef.current.srcObject = s;
            }
          })
          .catch(() => {
            setHasCameraPermission(false);
          });
      }
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [notchState]);

  const handleStateChange = (newState: NotchState) => {
    sounds.playClick();
    setNotchState(newState);
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playClick();
    setIsPlaying(!isPlaying);
  };

  const handleAddReminder = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playClick();
    onOpenApp?.('notes');
  };

  const toggleMirror = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playClick();
    if (notchState === 'mirror') {
      setNotchState('wide');
    } else {
      setNotchState('mirror');
    }
  };

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 select-none flex flex-col items-center">
      {/* State Switcher Badges Bar (Allows easily toggling between notch1, notch2, notch3 states) */}
      <div className="absolute -top-7 opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity flex items-center gap-1 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 text-[10px] text-white">
        <button
          onClick={() => handleStateChange('wide')}
          className={`px-1.5 py-0.5 rounded ${notchState === 'wide' ? 'bg-blue-600 font-bold' : 'hover:bg-white/20'}`}
        >
          Notch 1 (Wide)
        </button>
        <button
          onClick={() => handleStateChange('compact')}
          className={`px-1.5 py-0.5 rounded ${notchState === 'compact' ? 'bg-blue-600 font-bold' : 'hover:bg-white/20'}`}
        >
          Notch 2 (Compact)
        </button>
        <button
          onClick={() => handleStateChange('activity')}
          className={`px-1.5 py-0.5 rounded ${notchState === 'activity' ? 'bg-blue-600 font-bold' : 'hover:bg-white/20'}`}
        >
          Notch 3 (Activity)
        </button>
        <button
          onClick={() => handleStateChange('collapsed')}
          className={`px-1.5 py-0.5 rounded ${notchState === 'collapsed' ? 'bg-blue-600 font-bold' : 'hover:bg-white/20'}`}
        >
          Collapsed
        </button>
      </div>

      {/* NOTCH MAIN CONTAINER */}
      <div className="relative flex flex-col items-center">
        {/* Apple MacBook Inverted Corner Fillets (Ears) */}
        {notchState !== 'collapsed' && (
          <>
            {/* Left Ear */}
            <svg
              className="absolute -left-3.5 top-0 w-3.5 h-3.5 text-black fill-current pointer-events-none"
              viewBox="0 0 14 14"
            >
              <path d="M0,0 C7.73,0 14,6.27 14,14 V0 H0 Z" />
            </svg>
            {/* Right Ear */}
            <svg
              className="absolute -right-3.5 top-0 w-3.5 h-3.5 text-black fill-current pointer-events-none"
              viewBox="0 0 14 14"
            >
              <path d="M14,0 C6.27,0 0,6.27 0,14 V0 H14 Z" />
            </svg>
          </>
        )}

        {/* ============================================================ */}
        {/* STATE 1: WIDE NOOK (Matching notch1.jpg) */}
        {/* ============================================================ */}
        {notchState === 'wide' && (
          <div className="w-[710px] h-[106px] bg-black text-white rounded-b-[24px] px-4 pt-1.5 pb-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] border-b border-x border-white/10 flex flex-col justify-between transition-all duration-300">
            {/* Top Tabs: Nook / Tray / Settings */}
            <div className="flex items-center justify-between text-[11px] h-5 px-1">
              <div className="flex items-center gap-1">
                {/* Nook Tab */}
                <button
                  onClick={() => {
                    sounds.playClick();
                    setActiveTab('nook');
                  }}
                  className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full transition-colors ${
                    activeTab === 'nook'
                      ? 'bg-neutral-800 text-white font-medium border border-white/15'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Lightbulb size={12} className="text-amber-400" />
                  <span>Nook</span>
                </button>

                {/* Tray Tab */}
                <button
                  onClick={() => {
                    sounds.playClick();
                    setActiveTab('tray');
                  }}
                  className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full transition-colors ${
                    activeTab === 'tray'
                      ? 'bg-neutral-800 text-white font-medium border border-white/15'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Inbox size={12} />
                  <span>Tray</span>
                </button>
              </div>

              {/* Settings Gear & State Switcher */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStateChange('compact')}
                  className="text-white/40 hover:text-white/80 text-[10px] px-1.5 py-0.5 rounded bg-white/5 hover:bg-white/15"
                  title="Switch to Compact state (notch2)"
                >
                  Compact
                </button>
                <button
                  onClick={() => handleStateChange('activity')}
                  className="text-white/40 hover:text-white/80 text-[10px] px-1.5 py-0.5 rounded bg-white/5 hover:bg-white/15"
                  title="Switch to Activity state (notch3)"
                >
                  Activity
                </button>
                <button
                  onClick={() => {
                    sounds.playClick();
                    onOpenApp?.('settings');
                  }}
                  className="text-white/60 hover:text-white transition-colors p-1"
                >
                  <Settings size={13} />
                </button>
                <button
                  onClick={() => handleStateChange('collapsed')}
                  className="text-white/40 hover:text-white transition-colors p-0.5"
                  title="Collapse Notch"
                >
                  <X size={12} />
                </button>
              </div>
            </div>

            {/* TAB CONTENT: NOOK */}
            {activeTab === 'nook' && (
              <div className="flex items-center justify-between gap-4 px-1 pt-1">
                {/* Left: Spotify Music Card with Lupine Album Art */}
                <div className="flex items-center gap-3">
                  {/* Album Artwork with Spotify Badge */}
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-md shrink-0 border border-white/10 group cursor-pointer">
                    <img
                      src={lupineImg}
                      alt="Lupine"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    {/* Spotify Green Logo Badge */}
                    <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#1DB954] flex items-center justify-center shadow-md">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="black">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                      </svg>
                    </div>
                  </div>

                  {/* Track Info & Controls */}
                  <div className="flex flex-col justify-center">
                    <span className="text-[13px] font-semibold text-white leading-tight">
                      Lupine
                    </span>
                    <span className="text-[11px] text-white/70 leading-tight mt-0.5">
                      Lupine
                    </span>
                    <span className="text-[10px] text-white/50 leading-tight">
                      Silje Mørk
                    </span>

                    {/* Transport Controls */}
                    <div className="flex items-center gap-3 mt-1.5 text-white/80">
                      <button onClick={() => sounds.playClick()} className="hover:text-white">
                        <SkipBack size={13} fill="currentColor" />
                      </button>
                      <button onClick={togglePlay} className="hover:text-white">
                        {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                      </button>
                      <button onClick={() => sounds.playClick()} className="hover:text-white">
                        <SkipForward size={13} fill="currentColor" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Center Column: Add to Reminders Pill + Mirror Button */}
                <div className="flex items-center gap-3">
                  {/* Add To Reminders Pill */}
                  <button
                    onClick={handleAddReminder}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-white border border-white/10 shadow-sm transition-all text-[12px] font-medium group active:scale-95"
                  >
                    <Sparkles size={13} className="text-amber-400 group-hover:rotate-12 transition-transform" />
                    <span>Add To Reminders</span>
                  </button>

                  {/* Circular Mirror Camera Button */}
                  <button
                    onClick={toggleMirror}
                    className="w-14 h-14 rounded-full bg-neutral-900/90 hover:bg-neutral-800 border border-white/10 flex flex-col items-center justify-center gap-0.5 text-white shadow-sm transition-all group active:scale-95"
                    title="Toggle Camera Mirror"
                  >
                    <Camera size={16} className="text-white/80 group-hover:text-white transition-colors" />
                    <span className="text-[9px] font-medium text-white/60 group-hover:text-white">Mirror</span>
                  </button>
                </div>

                {/* Right Column: Calendar Widget Strip */}
                <div className="flex flex-col items-end pr-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[17px] font-bold text-white tracking-tight leading-none">
                      Aug
                    </span>
                    {/* Days Row */}
                    <div className="flex items-center gap-1.5 text-[9px] font-medium text-white/50">
                      <div className="flex flex-col items-center">
                        <span className="text-[8px]">S</span>
                        <span className="text-white/70">10</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[8px]">S</span>
                        <span className="text-white/70">11</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[8px]">M</span>
                        <span className="text-white/70">12</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[8px] text-blue-400 font-bold">TUE</span>
                        <span className="w-4 h-4 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center text-[9px] shadow-sm">
                          13
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[8px]">W</span>
                        <span className="text-white/70">14</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[8px]">T</span>
                        <span className="text-white/70">15</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[8px]">F</span>
                        <span className="text-white/70">16</span>
                      </div>
                    </div>
                  </div>

                  {/* Subtitle: Nothing for today */}
                  <div className="flex items-center gap-1 text-[11px] text-white/50 mt-1.5">
                    <CalendarIcon size={12} className="text-white/40" />
                    <span>Nothing for today</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: TRAY (File shelf / Clipboard) */}
            {activeTab === 'tray' && (
              <div className="flex items-center justify-center h-16 border border-dashed border-white/20 rounded-xl mx-2 bg-neutral-900/40">
                <span className="text-[12px] text-white/60">
                  Drop files, links, or notes here for quick access
                </span>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* STATE 2: COMPACT NOOK (Matching notch2.jpg) */}
        {/* ============================================================ */}
        {notchState === 'compact' && (
          <div className="w-[490px] h-[106px] bg-black text-white rounded-b-[24px] px-4 pt-1.5 pb-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] border-b border-x border-white/10 flex flex-col justify-between transition-all duration-300">
            {/* Top Tabs */}
            <div className="flex items-center justify-between text-[11px] h-5 px-1">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab('nook')}
                  className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-neutral-800 text-white font-medium border border-white/15"
                >
                  <Lightbulb size={12} className="text-amber-400" />
                  <span>Nook</span>
                </button>
                <button
                  onClick={() => setActiveTab('tray')}
                  className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-white/60 hover:text-white"
                >
                  <Inbox size={12} />
                  <span>Tray</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStateChange('wide')}
                  className="text-white/40 hover:text-white/80 text-[10px] px-1.5 py-0.5 rounded bg-white/5 hover:bg-white/15"
                >
                  Wide
                </button>
                <button
                  onClick={() => handleStateChange('activity')}
                  className="text-white/40 hover:text-white/80 text-[10px] px-1.5 py-0.5 rounded bg-white/5 hover:bg-white/15"
                >
                  Activity
                </button>
                <button
                  onClick={() => onOpenApp?.('settings')}
                  className="text-white/60 hover:text-white p-1"
                >
                  <Settings size={13} />
                </button>
                <button
                  onClick={() => handleStateChange('collapsed')}
                  className="text-white/40 hover:text-white p-0.5"
                >
                  <X size={12} />
                </button>
              </div>
            </div>

            {/* Content Row: West End Blues + Dual Stacked Pills + Mirror Button */}
            <div className="flex items-center justify-between gap-3 px-1 pt-1">
              {/* Left: Apple Music Card with West End Blues */}
              <div className="flex items-center gap-3">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-md shrink-0 border border-white/10 group cursor-pointer">
                  <img
                    src={westEndBluesImg}
                    alt="West End Blues"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {/* Apple Music Red Badge */}
                  <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#FA233B] flex items-center justify-center shadow-md">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 12c0 1.93-1.57 3.5-3.5 3.5S8.5 15.93 8.5 14s1.57-3.5 3.5-3.5c.34 0 .66.05.97.14V7.5l5-1.5v6c0 .73-.24 1.4-.64 1.95-.5.68-1.28 1.05-2.18 1.05-.11 0-.21 0-.32-.01l-.83-.09z" />
                    </svg>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <span className="text-[13px] font-semibold text-white leading-tight">
                    West End Blues
                  </span>
                  <span className="text-[11px] text-white/70 leading-tight mt-0.5 truncate max-w-[120px]">
                    The Complete Hot...
                  </span>
                  <span className="text-[10px] text-white/50 leading-tight truncate max-w-[120px]">
                    Louis Armstrong and...
                  </span>

                  {/* Controls */}
                  <div className="flex items-center gap-3 mt-1.5 text-white/80">
                    <button onClick={() => sounds.playClick()} className="hover:text-white">
                      <SkipBack size={13} fill="currentColor" />
                    </button>
                    <button onClick={togglePlay} className="hover:text-white">
                      {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                    </button>
                    <button onClick={() => sounds.playClick()} className="hover:text-white">
                      <SkipForward size={13} fill="currentColor" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Middle: Two Stacked Action Pills */}
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => sounds.playClick()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-white border border-white/10 text-[11px] font-medium transition-all group active:scale-95"
                >
                  <Sparkles size={11} className="text-amber-400 group-hover:rotate-12 transition-transform" />
                  <span>Spotify To...</span>
                </button>
                <button
                  onClick={() => sounds.playClick()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-white border border-white/10 text-[11px] font-medium transition-all group active:scale-95"
                >
                  <Sparkles size={11} className="text-amber-400 group-hover:rotate-12 transition-transform" />
                  <span>Ring Lais</span>
                </button>
              </div>

              {/* Right: Mirror Camera Button */}
              <button
                onClick={toggleMirror}
                className="w-14 h-14 rounded-full bg-neutral-900/90 hover:bg-neutral-800 border border-white/10 flex flex-col items-center justify-center gap-0.5 text-white shadow-sm transition-all group active:scale-95"
                title="Toggle Mirror"
              >
                <Camera size={16} className="text-white/80 group-hover:text-white transition-colors" />
                <span className="text-[9px] font-medium text-white/60 group-hover:text-white">Mirror</span>
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STATE 3: ACTIVITY / LIVE PROCESS (Matching notch3.jpg) */}
        {/* ============================================================ */}
        {notchState === 'activity' && (
          <div className="w-[290px] h-[68px] bg-black text-white rounded-b-[24px] px-4 pt-1.5 pb-2 shadow-[0_20px_50px_rgba(0,0,0,0.85)] border-b border-x border-white/10 flex flex-col items-center justify-center text-center transition-all duration-300">
            {/* Top label: Read __root.tsx 55 lines */}
            <div className="flex items-center justify-between w-full text-[12px] text-white/70 font-sans tracking-tight">
              <span>Read __root.tsx 55 lines</span>
              <button
                onClick={() => handleStateChange('wide')}
                className="text-[10px] text-white/40 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Bottom active action: Glowing Pink Icon + Reading file */}
            <div className="flex items-center gap-2 mt-1">
              {/* Glowing pink square icon from screenshot */}
              <div className="relative w-4 h-4 rounded bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center shadow-[0_0_12px_rgba(244,63,94,0.65)] animate-pulse">
                <div className="w-1.5 h-1.5 bg-white rounded-xs" />
              </div>

              <span className="text-[16px] font-semibold text-white tracking-tight">
                Reading file
              </span>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STATE 4: LIVE WEBCAM MIRROR */}
        {/* ============================================================ */}
        {notchState === 'mirror' && (
          <div className="w-[340px] h-[220px] bg-black text-white rounded-b-[28px] p-3 shadow-[0_25px_60px_rgba(0,0,0,0.9)] border-b border-x border-white/15 flex flex-col justify-between transition-all duration-300">
            <div className="flex items-center justify-between text-[11px] text-white/70 pb-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-semibold text-white">Live Mirror</span>
              </div>
              <button
                onClick={() => setNotchState('wide')}
                className="w-5 h-5 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-[10px]"
              >
                ✕
              </button>
            </div>

            {/* Video Viewfinder / Selfie Mirror */}
            <div className="relative flex-1 rounded-2xl overflow-hidden bg-neutral-900 flex items-center justify-center border border-white/10">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform -scale-x-100"
              />
              {!hasCameraPermission && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-neutral-900/90 text-white/70">
                  <Camera size={28} className="text-white/40 mb-2" />
                  <span className="text-[12px] font-medium">Mirror Viewfinder</span>
                  <span className="text-[10px] text-white/40 mt-1">Allow camera access to view selfie mirror</span>
                </div>
              )}
            </div>

            <div className="flex justify-center pt-2">
              <button
                onClick={() => setNotchState('wide')}
                className="px-4 py-1 rounded-full bg-white/15 hover:bg-white/25 text-white text-[11px] font-medium"
              >
                Close Mirror
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STATE 5: COLLAPSED MACBOOK NOTCH */}
        {/* ============================================================ */}
        {notchState === 'collapsed' && (
          <div
            onClick={() => handleStateChange('wide')}
            className="w-[160px] h-[28px] bg-black text-white rounded-b-[18px] flex items-center justify-center gap-2 px-3 cursor-pointer shadow-[0_8px_20px_rgba(0,0,0,0.6)] hover:h-[32px] transition-all group"
            title="Click to open Notch"
          >
            {/* Center camera lens */}
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-neutral-900 group-hover:bg-emerald-500 transition-colors" />
            </div>

            {/* Mini sound wave indicator */}
            <div className="flex items-end gap-0.5 h-2">
              <span className="w-0.5 h-2 bg-white/70 rounded-full animate-pulse" />
              <span className="w-0.5 h-1.5 bg-white/50 rounded-full animate-pulse delay-75" />
              <span className="w-0.5 h-2 bg-white/70 rounded-full animate-pulse delay-150" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
