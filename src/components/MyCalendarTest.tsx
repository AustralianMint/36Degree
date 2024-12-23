import React, { useState } from 'react';
import { PawPrint } from 'lucide-react';

// Define types for our content
interface BaseContent {
  type: 'message' | 'song';
  content: string;
}

interface MessageContent extends BaseContent {
  type: 'message';
}

interface SongContent extends BaseContent {
  type: 'song';
  link: string;
}

type DailyContent = MessageContent | SongContent;

// Define the type for our content dictionary
type ContentDictionary = {
  [key: string]: DailyContent;
};

const MyCalendar = () => {
  const [openDates, setOpenDates] = useState<Set<string>>(new Set());

  const dailyContent: ContentDictionary = {
    '2024-12-21': {
      type: 'message',
      content: 'Merry Christmas! 🎄'
    },
    '2024-12-22': {
      type: 'song',
      content: 'Our Song - Taylor Swift',
      link: 'https://open.spotify.com/track/...'
    },
    '2024-12-23': {
      type: 'message',
      content: 'I find you quite lovely! 🎄'
    },
    '2024-12-24': {
      type: 'message',
      content: 'I find you quite lovely! 🎄'
    },
    '2024-12-25': {
      type: 'message',
      content: 'I find you quite lovely! 🎄'
    },
    '2024-12-26': {
      type: 'message',
      content: 'I find you quite lovely! 🎄'
    },
    '2024-12-27': {
      type: 'message',
      content: 'I find you quite lovely! 🎄'
    },
    '2024-12-28': {
      type: 'message',
      content: 'I find you quite lovely! 🎄'
    },
    '2024-12-29': {
      type: 'message',
      content: 'I find you quite lovely! 🎄'
    },
    '2024-12-30': {
      type: 'message',
      content: 'I find you quite lovely! 🎄'
    },
    '2024-12-31': {
      type: 'message',
      content: 'I find you quite lovely! 🎄'
    },
    '2025-01-01': {
      type: 'message',
      content: 'I find you quite lovely! 🎄'
    },
  };

  const isDateAvailable = (dateStr: string): boolean => {
    const today = new Date();
    const cellDate = new Date(dateStr);
    return cellDate <= today;
  };

  const toggleDate = (dateStr: string) => {
    if (!isDateAvailable(dateStr)) return;
    const newOpenDates = new Set(openDates);
    if (newOpenDates.has(dateStr)) {
      newOpenDates.delete(dateStr);
    } else {
      newOpenDates.add(dateStr);
    }
    setOpenDates(newOpenDates);
  };

  const renderContent = (dateStr: string) => {
    if (!openDates.has(dateStr)) return null;
    const content = dailyContent[dateStr];
    if (!content) return null;
    return (
      <div className="mt-2 p-4 bg-pink-50 rounded-lg">
        <p className="text-lg font-medium">
          {content.type === 'song' ? '🎵' : '💌'}
        </p>
        <p className="mt-2">{content.content}</p>
        {content.type === 'song' && content.link && (
          <a
            href={content.link}
            className="text-pink-600 hover:text-pink-800 mt-2 inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            Listen on Spotify
          </a>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">36 Degree Mist Gang</h1>
        <p className="text-gray-600">Because advent calendars shouldn't end on Christmas ;)</p>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2 md:gap-4">
        {Object.keys(dailyContent).map((dateStr) => {
          const date = new Date(dateStr);
          const isAvailable = isDateAvailable(dateStr);
          return (
            <div
              key={dateStr}
              onClick={() => toggleDate(dateStr)}
              className={`
                relative aspect-square p-8 rounded-lg border-4 cursor-pointer
                flex flex-col items-center justify-center
                ${isAvailable
                  ? 'border-pink-400 hover:bg-pink-50'
                  : 'border-gray-200 cursor-not-allowed'
                }
                ${openDates.has(dateStr) ? 'bg-pink-50' : 'bg-white'}
              `}
            >
              <div className="text-lg font-bold mb-2">{date.getDate()}</div>
              <PawPrint
                className={`w-6 h-6 ${isAvailable ? 'text-pink-500' : 'text-gray-300'}`}
                fill={openDates.has(dateStr) ? 'currentColor' : 'none'}
              />
              {renderContent(dateStr)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyCalendar;
