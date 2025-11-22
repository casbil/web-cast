import React, { useState, useEffect } from 'react';
import { AppView } from './types';
import NavigationDrawer from './components/NavigationDrawer';
import TopBar from './components/TopBar';
import BrowserView from './components/BrowserView';
import FilesView from './components/FilesView';
import CastOverlay from './components/CastOverlay';
import { getSuggestedContent } from './services/geminiService';
import { Star, Clock, Tv, Info } from 'lucide-react';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>(AppView.BROWSER);
  const [isCastModalOpen, setIsCastModalOpen] = useState(false);
  const [isCasting, setIsCasting] = useState(false);
  const [notifications, setNotifications] = useState<string | null>(null);

  // Placeholder for suggested content in IPTV/Home
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    // On mount, let's fetch some cool AI suggestions to show we can
    const init = async () => {
        const suggs = await getSuggestedContent();
        setSuggestions(suggs);
    };
    init();
  }, []);

  const renderView = () => {
    switch (currentView) {
      case AppView.BROWSER:
        return <BrowserView />;
      case AppView.PHONE_FILES:
        return <FilesView />;
      case AppView.IPTV:
      case AppView.MOST_VISITED:
        return (
            <div className="p-6 space-y-6 bg-gray-50 h-full overflow-y-auto">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                    <div className="inline-block p-3 bg-yellow-100 rounded-full mb-4 text-yellow-600">
                        <Star size={32} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Premium Features</h2>
                    <p className="text-gray-600 mb-4">IPTV playlists and detailed tracking are available in the premium version.</p>
                </div>

                {suggestions.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="font-bold text-gray-700 flex items-center gap-2">
                            <Tv size={18} /> Trending Now (AI Suggested)
                        </h3>
                        {suggestions.map((item, idx) => (
                             <div key={idx} className="bg-white p-4 rounded-lg border-l-4 border-blue-500 shadow-sm">
                                <h4 className="font-bold text-gray-900">{item.category}</h4>
                                <p className="text-sm text-gray-600">{item.description}</p>
                             </div>
                        ))}
                    </div>
                )}
            </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8 text-center">
            <Info size={48} className="mb-4 opacity-50" />
            <h2 className="text-xl font-semibold">Under Construction</h2>
            <p className="mt-2 text-sm">The {currentView} view is coming soon.</p>
          </div>
        );
    }
  };

  return (
    <div className="h-screen w-full bg-gray-100 flex flex-col relative overflow-hidden font-sans">
      <TopBar 
        onMenuClick={() => setIsSidebarOpen(true)} 
        title={currentView}
        isCasting={isCasting}
        onCastClick={() => setIsCastModalOpen(true)}
      />

      <NavigationDrawer 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        currentView={currentView}
        onNavigate={setCurrentView}
      />

      <CastOverlay 
        isOpen={isCastModalOpen} 
        onClose={() => setIsCastModalOpen(false)} 
        onConnect={() => {
            setIsCasting(true);
            setNotifications("Connected to Living Room TV");
            setTimeout(() => setNotifications(null), 3000);
        }}
      />

      <main className="flex-1 relative overflow-hidden">
        {renderView()}
      </main>

      {/* Notification Toast */}
      {notifications && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm py-2 px-4 rounded-full shadow-lg animate-bounce">
            {notifications}
        </div>
      )}

      {/* Persistent Mini Player (Visible if media was playing) */}
      {isCasting && (
          <div className="h-14 bg-gray-900 text-white flex items-center px-4 justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-20">
              <div className="flex items-center gap-3">
                  <div className="w-10 h-8 bg-blue-600 rounded flex items-center justify-center">
                      <Tv size={16} />
                  </div>
                  <div className="flex flex-col">
                      <span className="text-xs text-gray-400 uppercase">Casting to TV</span>
                      <span className="text-sm font-medium">Sample Video Stream</span>
                  </div>
              </div>
              <button onClick={() => setIsCasting(false)} className="text-gray-400 hover:text-white">Stop</button>
          </div>
      )}
    </div>
  );
};

export default App;