import React from 'react';
import { Calendar, Home, BarChart3, Plus, Moon, Sun } from 'lucide-react';

interface NavigationProps {
  viewMode: 'today' | 'calendar' | 'stats';
  onViewChange: (mode: 'today' | 'calendar' | 'stats') => void;
  onAddHabit: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  viewMode,
  onViewChange,
  onAddHabit,
  darkMode,
  onToggleDarkMode
}) => {
  const navItems = [
    { id: 'today' as const, icon: Home, label: 'Today' },
    { id: 'calendar' as const, icon: Calendar, label: 'Calendar' },
    { id: 'stats' as const, icon: BarChart3, label: 'Stats' }
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">H</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">HabitFlow</h1>
            </div>
            
            <div className="flex space-x-4">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                    viewMode === item.id
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onToggleDarkMode}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button
              onClick={onAddHabit}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">Add Habit</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};