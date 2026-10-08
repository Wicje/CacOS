import React, { useState } from 'react';
import { sounds } from '../../utils/sound';

interface CalculatorAppProps {
  onClose: () => void;
  zIndex: number;
  onFocus: () => void;
}

export const CalculatorApp: React.FC<CalculatorAppProps> = ({ onClose, zIndex, onFocus }) => {
  const [display, setDisplay] = useState('0');
  const [prevVal, setPrevVal] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const [position, setPosition] = useState({ x: 300, y: 150 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = React.useRef({ startX: 0, startY: 0, posX: 300, posY: 150 });

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

  const inputDigit = (digit: string) => {
    sounds.playClick();
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDot = () => {
    sounds.playClick();
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    sounds.playClick();
    setDisplay('0');
    setPrevVal(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOp = (nextOp: string) => {
    sounds.playClick();
    const inputVal = parseFloat(display);
    if (prevVal === null) {
      setPrevVal(inputVal);
    } else if (operation) {
      const current = prevVal;
      let res = current;
      if (operation === '+') res = current + inputVal;
      if (operation === '−') res = current - inputVal;
      if (operation === '×') res = current * inputVal;
      if (operation === '÷') res = inputVal !== 0 ? current / inputVal : 0;
      setPrevVal(res);
      setDisplay(String(res));
    }
    setWaitingForOperand(true);
    setOperation(nextOp === '=' ? null : nextOp);
  };

  return (
    <div
      onMouseDown={onFocus}
      style={{ left: `${position.x}px`, top: `${position.y}px`, zIndex }}
      className="fixed w-[240px] rounded-[18px] bg-neutral-900/90 backdrop-blur-3xl shadow-2xl border border-white/20 select-none overflow-hidden"
    >
      {/* Titlebar */}
      <div
        onMouseDown={handleMouseDown}
        className="h-9 px-3 flex items-center justify-between cursor-default"
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
            onClick={() => onClose()}
            className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"
          />
          <button className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
        </div>
        <span className="text-[11px] font-medium text-white/50">Calculator</span>
        <div className="w-8" />
      </div>

      {/* Screen */}
      <div className="px-4 py-2 text-right">
        <span className="text-[44px] font-light text-white tracking-tight leading-none break-all font-sans">
          {display}
        </span>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-4 gap-2 p-3 pt-1">
        <button
          onClick={clear}
          className="h-11 rounded-full bg-neutral-700/80 text-white font-medium text-[16px] hover:bg-neutral-600 transition-colors"
        >
          {display !== '0' ? 'C' : 'AC'}
        </button>
        <button
          onClick={() => {
            sounds.playClick();
            setDisplay(String(parseFloat(display) * -1));
          }}
          className="h-11 rounded-full bg-neutral-700/80 text-white font-medium text-[16px] hover:bg-neutral-600 transition-colors"
        >
          ±
        </button>
        <button
          onClick={() => {
            sounds.playClick();
            setDisplay(String(parseFloat(display) / 100));
          }}
          className="h-11 rounded-full bg-neutral-700/80 text-white font-medium text-[16px] hover:bg-neutral-600 transition-colors"
        >
          %
        </button>
        <button
          onClick={() => performOp('÷')}
          className={`h-11 rounded-full font-medium text-[20px] transition-colors ${
            operation === '÷' ? 'bg-white text-[#FF9F0A]' : 'bg-[#FF9F0A] text-white hover:bg-[#FFB23E]'
          }`}
        >
          ÷
        </button>

        {['7', '8', '9'].map((n) => (
          <button
            key={n}
            onClick={() => inputDigit(n)}
            className="h-11 rounded-full bg-neutral-800/90 text-white font-medium text-[18px] hover:bg-neutral-700 transition-colors"
          >
            {n}
          </button>
        ))}
        <button
          onClick={() => performOp('×')}
          className={`h-11 rounded-full font-medium text-[20px] transition-colors ${
            operation === '×' ? 'bg-white text-[#FF9F0A]' : 'bg-[#FF9F0A] text-white hover:bg-[#FFB23E]'
          }`}
        >
          ×
        </button>

        {['4', '5', '6'].map((n) => (
          <button
            key={n}
            onClick={() => inputDigit(n)}
            className="h-11 rounded-full bg-neutral-800/90 text-white font-medium text-[18px] hover:bg-neutral-700 transition-colors"
          >
            {n}
          </button>
        ))}
        <button
          onClick={() => performOp('−')}
          className={`h-11 rounded-full font-medium text-[20px] transition-colors ${
            operation === '−' ? 'bg-white text-[#FF9F0A]' : 'bg-[#FF9F0A] text-white hover:bg-[#FFB23E]'
          }`}
        >
          −
        </button>

        {['1', '2', '3'].map((n) => (
          <button
            key={n}
            onClick={() => inputDigit(n)}
            className="h-11 rounded-full bg-neutral-800/90 text-white font-medium text-[18px] hover:bg-neutral-700 transition-colors"
          >
            {n}
          </button>
        ))}
        <button
          onClick={() => performOp('+')}
          className={`h-11 rounded-full font-medium text-[20px] transition-colors ${
            operation === '+' ? 'bg-white text-[#FF9F0A]' : 'bg-[#FF9F0A] text-white hover:bg-[#FFB23E]'
          }`}
        >
          +
        </button>

        <button
          onClick={() => inputDigit('0')}
          className="col-span-2 h-11 rounded-full bg-neutral-800/90 text-white font-medium text-[18px] pl-5 text-left hover:bg-neutral-700 transition-colors"
        >
          0
        </button>
        <button
          onClick={inputDot}
          className="h-11 rounded-full bg-neutral-800/90 text-white font-medium text-[18px] hover:bg-neutral-700 transition-colors"
        >
          .
        </button>
        <button
          onClick={() => performOp('=')}
          className="h-11 rounded-full bg-[#FF9F0A] text-white font-medium text-[20px] hover:bg-[#FFB23E] transition-colors"
        >
          =
        </button>
      </div>
    </div>
  );
};
