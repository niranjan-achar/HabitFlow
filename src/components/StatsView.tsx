import React from 'react';
import { TrendingUp, Target, Flame, Calendar, Award } from 'lucide-react';
import { Habit } from '../types';
import { formatDate, isToday } from '../utils/dateUtils';
import { getHabitCompletionRate } from '../utils/habitUtils';

interface StatsViewProps {
  habits: Habit[];
}

export const StatsView: React.FC<StatsViewProps> = ({ habits }) => {
  const today = new Date();
  const todayStr = formatDate(today);
  
  const completedToday = habits.filter(habit => habit.completions[todayStr]).length;
  const totalHabits = habits.length;
  const completionRate = totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0;
  
  const totalCompletions = habits.reduce((sum, habit) => sum + habit.totalCompletions, 0);
  const averageStreak = habits.length > 0 ? habits.reduce((sum, habit) => sum + habit.streak, 0) / habits.length : 0;
  const longestStreak = Math.max(...habits.map(habit => habit.bestStreak), 0);
  const activeStreaks = habits.filter(habit => habit.streak > 0).length;

  const getStreakColor = (streak: number) => {
    if (streak === 0) return 'text-gray-400';
    if (streak < 3) return 'text-yellow-500';
    if (streak < 7) return 'text-orange-500';
    return 'text-green-500';
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Completed Today</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedToday}/{totalHabits}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Target className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{completionRate.toFixed(0)}%</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-green-600 dark:text-green-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Active Streaks</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{activeStreaks}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
              <Flame className="text-orange-600 dark:text-orange-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Longest Streak</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{longestStreak}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <Award className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Habit Performance</h3>
        <div className="space-y-4">
          {habits.map(habit => {
            const completionRate = getHabitCompletionRate(habit);
            return (
              <div key={habit.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: habit.color }}
                  >
                    <span className="text-white text-sm">
                      {habit.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{habit.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{habit.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className={`text-lg font-bold ${getStreakColor(habit.streak)}`}>
                      {habit.streak}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {completionRate.toFixed(0)}%
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Rate</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};