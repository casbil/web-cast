import React, { useEffect, useState } from 'react';
import { Tv, Smartphone, Loader2, X } from 'lucide-react';

interface CastOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: () => void;
}

const CastOverlay: React.FC<CastOverlayProps> = ({ isOpen, onClose, onConnect }) => {
  const [devices, setDevices] = useState<string[]>([]);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setScanning(true);
      setDevices([]);
      // Simulate scanning
      setTimeout(() => {
        setDevices(['Living Room TV', 'Bedroom Chromecast', 'Office Display']);
        setScanning(false);
      }, 1500);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xs rounded-xl shadow-2xl overflow-hidden">
        <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
          <h2 className="font-medium">Connect to device</h2>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        
        <div className="p-4 min-h-[200px]">
          {scanning ? (
            <div className="flex flex-col items-center justify-center py-8 text-gray-500 gap-2">
              <Loader2 size={32} className="animate-spin text-blue-500" />
              <p className="text-sm">Searching for devices...</p>
            </div>
          ) : (
            <div className="space-y-2">
              {devices.map((device, i) => (
                <button
                  key={i}
                  onClick={() => {
                    onConnect();
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-left transition-colors group"
                >
                  <Tv size={20} className="text-gray-500 group-hover:text-blue-500" />
                  <span className="text-gray-700 font-medium group-hover:text-blue-700">{device}</span>
                </button>
              ))}
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="w-full flex items-center gap-3 p-2 opacity-60">
                    <Smartphone size={20} />
                    <span className="text-sm">This Phone</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CastOverlay;