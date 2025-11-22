import React from 'react';

export enum AppView {
  BROWSER = 'Browser',
  PHONE_FILES = 'Phone files',
  IPTV = 'IPTV',
  RECENT_MEDIA = 'Recent media',
  QUEUE = 'Queue',
  BOOKMARKS = 'Bookmarks',
  HISTORY = 'Browser history',
  MOST_VISITED = 'Most visited',
  DOWNLOADS = 'Downloads',
  FAQ = 'FAQ'
}

export interface VideoResult {
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  source: string;
}

export interface PlayableMedia {
  id: string;
  url: string;
  title: string;
  type: 'video' | 'image' | 'audio';
  file?: File;
}

export interface NavigationItem {
  id: AppView;
  label: string;
  icon: React.ReactNode;
}