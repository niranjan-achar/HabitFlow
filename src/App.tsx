import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HabitCard } from './components/HabitCard';
import { HabitForm } from './components/HabitForm';
import { CalendarView } from './components/CalendarView';
import { StatsView } from './components/StatsView';
import { useHabits } from './hooks/useHabits';
import { formatDisplayDate } from './utils/dateUtils';
import { saveDarkMode, loadDarkMode } from './utils/storage';
import { Habit } from './types';

function App() {
  const {
    habits,
    loading,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitCompletion
  } = useHabits();
  
  const [viewMode, setViewMode] = useState<'today' | 'calendar' | 'stats'>('today');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = loadDarkMode();
    setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    saveDarkMode(darkMode);
  }, [darkMode]);

  const handleAddHabit = () => {
    setEditingHabit(null);
    setShowForm(true);
  };

  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setShowForm(true);
  };

  const handleFormSubmit = (formData: any) => {
    if (editingHabit) {
      updateHabit(editingHabit.id, formData);
    } else {
      addHabit(formData);
    }
    setEditingHabit(null);
  };

  const handleDeleteHabit = (id: string) => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      deleteHabit(id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your habits...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navigation
        viewMode={viewMode}
        onViewChange={setViewMode}
        onAddHabit={handleAddHabit}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === 'today' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {formatDisplayDate(selectedDate)}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {habits.length === 0
                  ? 'No habits yet. Create your first habit to get started!'
                  : `${habits.filter(h => h.completions[selectedDate.toISOString().split('T')[0]]).length} of ${habits.length} habits completed`
                }
              </p>
            </div>

            {habits.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-4xl font-bold">+</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Start Your Journey
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Create your first habit and begin building a better you.
                </p>
                <button
                  onClick={handleAddHabit}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Create Your First Habit
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {habits.map(habit => (
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    selectedDate={selectedDate}
                    onToggleCompletion={toggleHabitCompletion}
                    onEdit={handleEditHabit}
                    onDelete={handleDeleteHabit}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {viewMode === 'calendar' && (
          <div className="max-w-2xl mx-auto">
            <CalendarView
              habits={habits}
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
          </div>
        )}

        {viewMode === 'stats' && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Your Progress
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Track your habit performance and celebrate your achievements
              </p>
            </div>
            <StatsView habits={habits} />
          </div>
        )}
      </main>

      <HabitForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleFormSubmit}
        editingHabit={editingHabit}
      />
    </div>
  );
}

export default App;