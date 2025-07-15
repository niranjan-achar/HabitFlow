import { Habit } from '../types';
import { formatDate } from './dateUtils';

export const calculateStreak = (habit: Habit): number => {
  const today = new Date();
  let streak = 0;
  let currentDate = new Date(today);
  
  while (habit.completions[formatDate(currentDate)]) {
    streak++;
    currentDate.setDate(currentDate.getDate() - 1);
  }
  
  return streak;
};

export const updateHabitCompletion = (habit: Habit, date: Date, completed: boolean): Habit => {
  const dateStr = formatDate(date);
  const updatedCompletions = { ...habit.completions };
  
  if (completed) {
    updatedCompletions[dateStr] = true;
  } else {
    delete updatedCompletions[dateStr];
  }
  
  const streak = calculateStreak({ ...habit, completions: updatedCompletions });
  const totalCompletions = Object.keys(updatedCompletions).length;
  
  return {
    ...habit,
    completions: updatedCompletions,
    streak,
    totalCompletions,
    bestStreak: Math.max(habit.bestStreak, streak)
  };
};

export const generateHabitId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const getHabitCompletionRate = (habit: Habit): number => {
  const daysSinceCreation = Math.floor((Date.now() - habit.createdAt.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return daysSinceCreation > 0 ? (habit.totalCompletions / daysSinceCreation) * 100 : 0;
};