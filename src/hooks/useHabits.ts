import { useState, useEffect } from 'react';
import { Habit, HabitFormData } from '../types';
import { generateHabitId, updateHabitCompletion } from '../utils/habitUtils';
import { saveHabits, loadHabits } from '../utils/storage';

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadedHabits = loadHabits();
    setHabits(loadedHabits);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      saveHabits(habits);
    }
  }, [habits, loading]);

  const addHabit = (formData: HabitFormData) => {
    const newHabit: Habit = {
      id: generateHabitId(),
      ...formData,
      createdAt: new Date(),
      streak: 0,
      completions: {},
      bestStreak: 0,
      totalCompletions: 0
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const updateHabit = (id: string, formData: HabitFormData) => {
    setHabits(prev => prev.map(habit => 
      habit.id === id ? { ...habit, ...formData } : habit
    ));
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== id));
  };

  const toggleHabitCompletion = (id: string, date: Date) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === id) {
        const dateStr = date.toISOString().split('T')[0];
        const isCompleted = habit.completions[dateStr];
        return updateHabitCompletion(habit, date, !isCompleted);
      }
      return habit;
    }));
  };

  return {
    habits,
    loading,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitCompletion
  };
};