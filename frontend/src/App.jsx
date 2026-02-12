import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import WeeklyTasksPage from './pages/WeeklyTasksPage';
import AddEditTaskPage from './pages/AddEditTaskPage';
import MonthlyProgressPage from './pages/MonthlyProgressPage';
import SettingsPage from './pages/SettingsPage';
import AdminDashboard from './pages/AdminDashboard';
import UserTasksPage from './pages/UserTasksPage';

import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<WeeklyTasksPage />} />
            <Route path="/add-task" element={<AddEditTaskPage />} />
            <Route path="/progress" element={<MonthlyProgressPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users/:userId/tasks" element={<UserTasksPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
