import React, { useState, useCallback } from 'react';
import { Search, Globe, PlayCircle, Loader2 } from 'lucide-react';
import { searchVideosWithGemini } from '../services/geminiService';
import { VideoResult } from '../types';

const BrowserView: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<VideoResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    // Simulate network delay + Gemini processing
    const foundVideos = await searchVideosWithGemini(url);
    setResults(foundVideos);
    setIsLoading(false);
  }, [url]);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* URL Bar */}
      <div className="bg-white p-2 shadow-sm border-b flex items-center gap-2 sticky top-0 z-10">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Globe size={16} className="text-gray-400" />
          </div>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Search or enter web address"
              className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg bg-[#F5F5F5] text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm select-text transition-all"
            />
          </form>
        </div>
        <button 
          onClick={handleSearch}
          className="bg-[#2196F3] text-white p-2.5 rounded-lg shadow-sm active:bg-blue-600 transition-colors"
        >
          {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
        </button>
      </div>

      {/* Browser Content Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {!hasSearched ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 mt-[-40px]">
            <Globe size={64} className="mb-4 text-gray-200" />
            <h2 className="text-xl font-semibold text-gray-600">Start Browsing</h2>
            <p className="max-w-xs mt-2 text-sm text-gray-400">
              Find videos on the web to cast to your TV.
            </p>
            
            <div className="mt-8 w-full max-w-sm">
              <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-3">Popular Searches</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['Live News', 'Sports Highlights', 'Music Videos', 'Tech Reviews'].map(tag => (
                  <button 
                    key={tag}
                    onClick={() => { setUrl(tag); }}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 shadow-sm hover:bg-gray-50 hover:border-blue-300 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 pb-20">
             <div className="flex items-center justify-between px-1">
               <h3 className="text-base font-bold text-gray-700 uppercase tracking-wide">Video Results</h3>
               <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded uppercase">Smart Search</span>
             </div>
             
             {results.length === 0 && !isLoading && (
               <div className="text-center py-10 text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
                 No videos found. Try a different search term.
               </div>
             )}

             {results.map((video, idx) => (
               <div key={idx} className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden flex h-28 group active:ring-2 active:ring-blue-400 transition-all">
                 <div className="w-36 h-full bg-gray-200 relative flex-shrink-0">
                   <img 
                     src={`https://picsum.photos/300/200?random=${idx + 100}`} 
                     alt="Thumbnail" 
                     className="w-full h-full object-cover"
                   />
                   <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
                     {video.duration}
                   </div>
                 </div>
                 <div className="p-3 flex flex-col justify-between flex-1 min-w-0">
                   <div>
                     <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight">{video.title}</h4>
                     <p className="text-xs text-gray-500 mt-1 line-clamp-1">{video.source}</p>
                   </div>
                   <div className="flex justify-between items-center mt-2">
                     <span className="text-[10px] text-gray-400 line-clamp-1 flex-1 mr-2">{video.description}</span>
                     <button className="flex items-center gap-1 text-white bg-[#FFB300] px-3 py-1.5 rounded shadow-sm text-xs font-bold uppercase tracking-wide hover:bg-yellow-600 active:transform active:scale-95 transition-all">
                       <PlayCircle size={14} fill="currentColor" className="text-white" />
                     </button>
                   </div>
                 </div>
               </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowserView;