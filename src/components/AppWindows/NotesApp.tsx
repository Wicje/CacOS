import React, { useState } from 'react';
import { sounds } from '../../utils/sound';
import { Edit3, Trash2, Folder, Plus } from 'lucide-react';

interface NotesAppProps {
  onClose: () => void;
  zIndex: number;
  onFocus: () => void;
}

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

export const NotesApp: React.FC<NotesAppProps> = ({ onClose, zIndex, onFocus }) => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'macOS Sequoia Setup',
      content: 'Pixel-perfect desktop reproduction with Lake Tahoe dynamic wallpaper, Applications folder window, desktop widgets, control center, and interactive dock.',
      date: '09:43'
    },
    {
      id: '2',
      title: 'Design Philosophy',
      content: 'Domain-native typography, San Francisco styling, authentic traffic lights, glassmorphism blur and subtle shadows.',
      date: 'Yesterday'
    }
  ]);
  const [selectedNoteId, setSelectedNoteId] = useState('1');
  const [position, setPosition] = useState({ x: 380, y: 120 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = React.useRef({ startX: 0, startY: 0, posX: 380, posY: 120 });

  const activeNote = notes.find((n) => n.id === selectedNoteId) || notes[0];

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

  React.useEffect(() => {
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

  const addNote = () => {
    sounds.playClick();
    const newNote: Note = {
      id: String(Date.now()),
      title: 'New Note',
      content: '',
      date: 'Just now'
    };
    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
  };

  const updateActiveNoteContent = (content: string) => {
    setNotes(notes.map(n => {
      if (n.id === selectedNoteId) {
        const title = content.split('\n')[0].substring(0, 30) || 'New Note';
        return { ...n, title, content };
      }
      return n;
    }));
  };

  return (
    <div
      onMouseDown={onFocus}
      style={{ left: `${position.x}px`, top: `${position.y}px`, zIndex }}
      className="fixed w-[620px] h-[400px] rounded-[18px] bg-[#1e1e20]/95 backdrop-blur-3xl shadow-2xl border border-white/20 text-white flex flex-col select-none overflow-hidden"
    >
      {/* Titlebar */}
      <div
        onMouseDown={handleMouseDown}
        className="h-10 border-b border-white/10 px-3 flex items-center justify-between cursor-default shrink-0"
      >
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              sounds.playClose();
              onClose();
            }}
            className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]"
          />
          <button
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"
          />
          <button className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
        </div>
        <span className="text-[12px] font-medium text-white/70">Notes</span>
        <button
          onClick={addNote}
          className="p-1 rounded-md hover:bg-white/10 text-amber-400"
          title="New Note"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Body: Sidebar + Editor */}
      <div className="flex flex-1 overflow-hidden">
        {/* Notes list */}
        <div className="w-52 border-r border-white/10 overflow-y-auto p-2">
          {notes.map((note) => (
            <div
              key={note.id}
              onClick={() => {
                sounds.playClick();
                setSelectedNoteId(note.id);
              }}
              className={`p-2.5 rounded-xl mb-1 cursor-pointer transition-colors ${
                note.id === selectedNoteId
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'hover:bg-white/5 text-white/80'
              }`}
            >
              <div className="text-[12px] font-semibold truncate">{note.title}</div>
              <div className="text-[10px] text-white/50 flex items-center justify-between mt-1">
                <span>{note.date}</span>
                <span className="truncate max-w-[80px]">{note.content.substring(0, 20)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Note editor */}
        <div className="flex-1 p-5 flex flex-col bg-neutral-900/40">
          <textarea
            value={activeNote?.content || ''}
            onChange={(e) => updateActiveNoteContent(e.target.value)}
            placeholder="Write note here..."
            className="w-full h-full bg-transparent resize-none outline-none text-[14px] leading-relaxed text-white/90 placeholder-white/30 font-sans"
          />
        </div>
      </div>
    </div>
  );
};
