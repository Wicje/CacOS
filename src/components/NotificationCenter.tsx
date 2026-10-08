import React, { useState, useEffect } from 'react';
import { sounds } from '../utils/sound';
import { Calendar, Bell, Radio, CheckCircle, X, Clock } from 'lucide-react';

export interface NotificationItem {
  id: string;
  app: string;
  title: string;
  message: string;
  time: string;
  icon: 'calendar' | 'reminder' | 'airdrop' | 'system';
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp?: (appId: string) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  onOpenApp
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      app: 'Calendar',
      title: 'Design Sync · Lake Tahoe Review',
      message: 'Starts in 15 minutes with the Design Team.',
      time: '09:30',
      icon: 'calendar'
    },
    {
      id: '2',
      app: 'Reminders',
      title: '4 tasks remaining today',
      message: 'Review Sequoia UI specs, test window physics.',
      time: '08:45',
      icon: 'reminder'
    },
    {
      id: '3',
      app: 'AirDrop',
      title: "Victor's iPhone",
      message: 'Ready to share 3 high-resolution photos.',
      time: '08:12',
      icon: 'airdrop'
    }
  ]);

  if (!isOpen) return null;

  const removeNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playClick();
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'calendar':
        return <Calendar size={14} className="text-red-400" />;
      case 'reminder':
        return <CheckCircle size={14} className="text-amber-400" />;
      case 'airdrop':
        return <Radio size={14} className="text-blue-400" />;
      default:
        return <Bell size={14} className="text-slate-400" />;
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed top-8 right-3 z-50 w-[320px] rounded-3xl bg-slate-900/75 backdrop-blur-3xl border border-white/20 p-3 shadow-2xl text-white select-none mac-specular-glass"
    >
      <div className="flex items-center justify-between px-1 mb-2">
        <span className="text-[12px] font-semibold tracking-tight text-white/80">
          Notifications
        </span>
        {notifications.length > 0 && (
          <button
            onClick={() => {
              sounds.playClick();
              setNotifications([]);
            }}
            className="text-[11px] text-white/50 hover:text-white transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2 max-h-[420px] overflow-y-auto custom-scrollbar">
        {notifications.length === 0 ? (
          <div className="py-8 text-center text-white/40 text-[12px]">
            No New Notifications
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                sounds.playLaunch();
                if (n.icon === 'calendar') onOpenApp?.('calendar');
                if (n.icon === 'reminder') onOpenApp?.('notes');
              }}
              className="relative rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md p-3 border border-white/10 cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  {getIcon(n.icon)}
                  <span className="text-[11px] font-semibold text-white/90 uppercase tracking-wider">
                    {n.app}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-white/50">{n.time}</span>
                  <button
                    onClick={(e) => removeNotification(n.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-0.5 rounded-full hover:bg-white/20 text-white/60 hover:text-white transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              </div>

              <div className="text-[12px] font-medium text-white leading-snug">
                {n.title}
              </div>
              <div className="text-[11px] text-white/70 mt-0.5 leading-snug">
                {n.message}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
