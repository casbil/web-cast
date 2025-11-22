import React from 'react';
import { AppView } from '../types';
import { 
  Globe, Folder, Tv, ListVideo, Bookmark, 
  History, Star, Download, HelpCircle, X
} from 'lucide-react';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

const menuItems = [
  { id: AppView.BROWSER, icon: <Globe size={22} />, label: 'Browser' },
  { id: AppView.PHONE_FILES, icon: <Folder size={22} />, label: 'Phone files' },
  { id: AppView.IPTV, icon: <Tv size={22} />, label: 'IPTV' },
  { id: AppView.RECENT_MEDIA, icon: <ListVideo size={22} />, label: 'Recent media' },
  { id: AppView.QUEUE, icon: <ListVideo size={22} />, label: 'Queue' },
  { id: AppView.BOOKMARKS, icon: <Bookmark size={22} />, label: 'Bookmarks' },
  { id: AppView.HISTORY, icon: <History size={22} />, label: 'Browser history' },
  { id: AppView.MOST_VISITED, icon: <Star size={22} />, label: 'Most visited' },
  { id: AppView.DOWNLOADS, icon: <Download size={22} />, label: 'Downloads' },
  { id: AppView.FAQ, icon: <HelpCircle size={22} />, label: 'FAQ' },
];

const NavigationDrawer: React.FC<NavigationDrawerProps> = ({ isOpen, onClose, currentView, onNavigate }) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div 
        className={`fixed inset-y-0 left-0 w-[85%] max-w-[320px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header - Material Design Style matching screenshot */}
        <div className="h-44 relative bg-[#2196F3] overflow-hidden flex flex-col justify-end p-4 text-white shadow-md">
           
           {/* Geometric Shapes Layer */}
           <div className="absolute inset-0 pointer-events-none">
             {/* Large Orange Triangle (Top Left) */}
             <div 
               className="absolute top-0 left-0 w-0 h-0"
               style={{
                 borderTop: '160px solid #FFA726', // Material Orange 400
                 borderRight: '320px solid transparent',
               }}
             />
             
             {/* Yellow Overlapping Triangle (Top Left, smaller) */}
             <div 
               className="absolute top-0 left-0 w-0 h-0 opacity-90"
               style={{
                 borderTop: '120px solid #FFCA28', // Material Amber 400
                 borderRight: '240px solid transparent',
               }}
             />
           </div>

           {/* Header Content */}
           <div className="relative z-10 mt-auto pl-1 pb-1">
             <h1 className="text-xl font-bold tracking-wide text-white drop-shadow-sm">Web Video Caster</h1>
             <p className="text-xs text-blue-50 opacity-90 mt-0.5 font-medium">v4.5.1 r1708</p>
           </div>
        </div>

        {/* Menu Items */}
        <div className="overflow-y-auto h-[calc(100%-11rem)] py-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                onClose();
              }}
              className={`w-full flex items-center gap-5 px-5 py-4 text-[15px] font-medium transition-colors ${
                currentView === item.id 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-[#424242] hover:bg-gray-100'
              }`}
            >
              <span className={currentView === item.id ? 'text-[#2196F3]' : 'text-[#757575]'}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default NavigationDrawer;