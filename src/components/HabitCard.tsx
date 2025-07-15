import React from 'react';
import { Check, Target, Flame, Edit2, Trash2 } from 'lucide-react';
import { Habit } from '../types';
import { formatDate, isToday } from '../utils/dateUtils';

interface HabitCardProps {
  habit: Habit;
  selectedDate: Date;
  onToggleCompletion: (id: string, date: Date) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (id: string) => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  selectedDate,
  onToggleCompletion,
  onEdit,
  onDelete
}) => {
  const isCompleted = habit.completions[formatDate(selectedDate)];
  const isTodaySelected = isToday(selectedDate);
  
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'target': return Target;
      case 'flame': return Flame;
      default: return Target;
    }
  };

  const IconComponent = getIconComponent(habit.icon);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md"
            style={{ backgroundColor: habit.color }}
          >
            <IconComponent size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{habit.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{habit.category}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(habit)}
            className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(habit.id)}
            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-400 mb-4">{habit.description}</p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{habit.streak}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Current Streak</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{habit.bestStreak}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Best Streak</div>
          </div>
        </div>

        <button
          onClick={() => onToggleCompletion(habit.id, selectedDate)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
            isCompleted
              ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg'
              : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-400 dark:text-gray-300'
          }`}
        >
          <Check size={20} />
        </button>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <span>Total: {habit.totalCompletions} days</span>
        {isTodaySelected && (
          <span className={`px-2 py-1 rounded-full text-xs ${
            isCompleted ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
          }`}>
            {isCompleted ? 'Completed' : 'Pending'}
          </span>
        )}
      </div>
    </div>
  );
};