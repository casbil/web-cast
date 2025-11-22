import React from 'react';
import { Menu, Cast, MoreVertical } from 'lucide-react';

interface TopBarProps {
  onMenuClick: () => void;
  title: string;
  isCasting?: boolean;
  onCastClick?: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onMenuClick, title, isCasting = false, onCastClick }) => {
  return (
    <div className="h-14 bg-[#0277BD] flex items-center justify-between px-2 shadow-md z-30 relative text-white">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-lg font-medium truncate">{title}</h1>
      </div>

      <div className="flex items-center gap-1">
        <button 
          onClick={onCastClick}
          className={`p-2 rounded-full transition-colors ${isCasting ? 'text-yellow-300 bg-white/20' : 'hover:bg-white/10'}`}
        >
          <Cast size={24} className={isCasting ? "animate-pulse" : ""} />
        </button>
        <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <MoreVertical size={24} />
        </button>
      </div>
    </div>
  );
};

export default TopBar;