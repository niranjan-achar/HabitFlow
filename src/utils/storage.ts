import { Habit } from '../types';

const STORAGE_KEY = 'habit-tracker-data';

export const saveHabits = (habits: Habit[]): void => {
  try {
    const serialized = habits.map(habit => ({
      ...habit,
      createdAt: habit.createdAt.toISOString()
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
  } catch (error) {
    console.error('Failed to save habits:', error);
  }
};

export const loadHabits = (): Habit[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    return parsed.map((habit: any) => ({
      ...habit,
      createdAt: new Date(habit.createdAt)
    }));
  } catch (error) {
    console.error('Failed to load habits:', error);
    return [];
  }
};

export const saveDarkMode = (isDark: boolean): void => {
  localStorage.setItem('dark-mode', JSON.stringify(isDark));
};

export const loadDarkMode = (): boolean => {
  try {
    const stored = localStorage.getItem('dark-mode');
    return stored ? JSON.parse(stored) : false;
  } catch (error) {
    return false;
  }
};