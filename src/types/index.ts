export interface AppItem {
  id: string;
  name: string;
  iconType: string;
  category?: string;
  badge?: number | string;
  isRunning?: boolean;
}

export interface WindowState {
  id: string;
  title: string;
  appId: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export type ViewMode = 'grid' | 'list' | 'columns' | 'gallery';
