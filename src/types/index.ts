export interface Habit {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  createdAt: Date;
  category: string;
  streak: number;
  completions: Record<string, boolean>; // date string -> completed
  bestStreak: number;
  totalCompletions: number;
}

export interface HabitFormData {
  name: string;
  description: string;
  color: string;
  icon: string;
  category: string;
}

export interface AppState {
  habits: Habit[];
  selectedDate: Date;
  viewMode: 'today' | 'calendar' | 'stats';
  darkMode: boolean;
}

export interface HabitStats {
  totalHabits: number;
  completedToday: number;
  completionRate: number;
  longestStreak: number;
  activeStreaks: number;
}