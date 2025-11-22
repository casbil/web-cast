import React, { useState } from 'react';
import { Folder, Music, Video, Image, File as FileIcon, Play } from 'lucide-react';

interface FileItem {
  name: string;
  size: string;
  type: 'folder' | 'video' | 'audio' | 'image';
  date: string;
}

const mockFiles: FileItem[] = [
  { name: 'DCIM', size: '12 items', type: 'folder', date: 'Oct 24' },
  { name: 'Downloads', size: '5 items', type: 'folder', date: 'Oct 22' },
  { name: 'Movies', size: '2 items', type: 'folder', date: 'Sep 15' },
  { name: 'Vacation.mp4', size: '254 MB', type: 'video', date: 'Yesterday' },
  { name: 'Concert.mp3', size: '12 MB', type: 'audio', date: 'Oct 20' },
  { name: 'IMG_2023.jpg', size: '3.2 MB', type: 'image', date: 'Oct 18' },
];

const FilesView: React.FC = () => {
  const [files] = useState<FileItem[]>(mockFiles);

  const getIcon = (type: string) => {
    switch (type) {
      case 'folder': return <Folder className="text-yellow-500" size={32} fill="currentColor" fillOpacity={0.2} />;
      case 'video': return <Video className="text-purple-500" size={32} />;
      case 'audio': return <Music className="text-red-500" size={32} />;
      case 'image': return <Image className="text-green-500" size={32} />;
      default: return <FileIcon className="text-gray-400" size={32} />;
    }
  };

  return (
    <div className="h-full bg-white">
       {/* Local input simulation */}
       <div className="p-4 border-b bg-gray-50">
        <label className="flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white transition-colors">
            <Video size={24} />
            <span className="mt-2 text-sm font-medium">Select File to Cast</span>
            <input type='file' className="hidden" accept="video/*,audio/*,image/*" />
        </label>
       </div>

       <div className="p-2">
         <h3 className="text-sm font-bold text-gray-500 px-2 mb-2 uppercase tracking-wider">Local Storage</h3>
         <ul className="space-y-1">
           {files.map((file, idx) => (
             <li key={idx} className="flex items-center p-3 hover:bg-gray-100 rounded-md cursor-pointer transition-colors">
               <div className="mr-4">
                 {getIcon(file.type)}
               </div>
               <div className="flex-1 min-w-0">
                 <h4 className="text-sm font-medium text-gray-900 truncate">{file.name}</h4>
                 <p className="text-xs text-gray-500">{file.size} • {file.date}</p>
               </div>
               {file.type !== 'folder' && (
                 <button className="p-2 text-gray-400 hover:text-blue-600">
                   <Play size={20} />
                 </button>
               )}
             </li>
           ))}
         </ul>
       </div>
    </div>
  );
};

export default FilesView;