import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, Moon, Sun } from 'lucide-react';

interface Props {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<Props> = ({ darkMode, toggleDarkMode }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-indigo-600">GigFlow</h1>
          <span className="text-gray-400 text-sm">Smart Leads Dashboard</span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className="flex items-center space-x-2">
            <User size={16} className="text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-700 dark:text-gray-300">{user?.name}</span>
            <span className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-full capitalize">
              {user?.role}
            </span>
          </div>
          <button
            onClick={logout}
            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;