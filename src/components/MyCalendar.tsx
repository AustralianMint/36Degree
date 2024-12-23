import React, { useState } from 'react';
import { Heart } from 'lucide-react';

// This is your main component - like a SwiftUI View
const MyCalendar = () => {
  // This is like @State in SwiftUI - it holds data that can change
  const [openDates, setOpenDates] = useState<Set<string>>(new Set());

  // This object holds all your daily content
  const dailyContent = {
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
    }
    // Add more dates here!
  };

  // Function to check if a date should be available
  const isDateAvailable = (dateStr: string): boolean => {
    const today = new Date();
    const cellDate = new Date(dateStr);
    return cellDate <= today;
  };

  // Function to handle clicking on a date
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

  // Function to render the content for a date
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
        {content.link && (
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

  // This is like your view's body in SwiftUI
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">36 Degree Mist Gang</h1>
        <p className="text-gray-600">Because advent calendars shouldn't end on Christmas ;)</p>
      </div>
      
      <div className="grid grid-cols-7 gap-4">
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
              <Heart 
                className={`w-6 h-6 ${isAvailable ? 'text-pink-500' : 'text-gray-300'}`}
                fill={openDates.has(dateStr) ? 'currentColor' : 'none'}
              />
              {renderContent(dateStr)}
            </div>
          )}
        )}
      </div>
    </div>
  );
};

// This is like public access in Swift - makes the component available to other files
export default MyCalendar;
