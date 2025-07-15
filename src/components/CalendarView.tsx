import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Habit } from '../types';
import { formatDate, getDaysInMonth, getWeekdays } from '../utils/dateUtils';

interface CalendarViewProps {
  habits: Habit[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  habits,
  selectedDate,
  onDateChange
}) => {
  const [currentMonth, setCurrentMonth] = React.useState(selectedDate);
  const days = getDaysInMonth(currentMonth);
  const weekdays = getWeekdays();

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentMonth(newMonth);
  };

  const getCompletionCount = (date: Date) => {
    const dateStr = formatDate(date);
    return habits.filter(habit => habit.completions[dateStr]).length;
  };

  const getCompletionPercentage = (date: Date) => {
    if (habits.length === 0) return 0;
    return (getCompletionCount(date) / habits.length) * 100;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return formatDate(date) === formatDate(today);
  };

  const isSelected = (date: Date) => {
    return formatDate(date) === formatDate(selectedDate);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekdays.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          const completionPercentage = getCompletionPercentage(date);
          const completionCount = getCompletionCount(date);
          
          return (
            <button
              key={index}
              onClick={() => onDateChange(date)}
              className={`aspect-square p-2 rounded-lg text-sm transition-all duration-200 relative ${
                isSelected(date)
                  ? 'bg-blue-500 text-white shadow-lg'
                  : isToday(date)
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div className="font-medium">{date.getDate()}</div>
              {completionCount > 0 && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: Math.min(completionCount, 3) }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 h-1 rounded-full ${
                          isSelected(date) ? 'bg-white' : 'bg-green-500'
                        }`}
                      />
                    ))}
                    {completionCount > 3 && (
                      <div className={`text-xs ${isSelected(date) ? 'text-white' : 'text-green-500'}`}>
                        +
                      </div>
                    )}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
        Click on any date to view habits for that day
      </div>
    </div>
  );
};