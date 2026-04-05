import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import RoleSwitcher from './RoleSwitcher';
import { Sun, Moon, Menu } from 'lucide-react';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 sm:px-6 transition-colors duration-200 z-10 w-full shadow-sm">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
          <Menu size={20} />
        </button>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white hidden sm:block">
          Overview
        </h2>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <RoleSwitcher />

        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1 hidden sm:block"></div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-200"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        {/* User Avatar Placeholder */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-500 to-primary-600 flex items-center justify-center text-white font-semibold shadow-sm cursor-pointer hover:shadow-md transition-all border-2 border-white dark:border-gray-800">
          U
        </div>
      </div>
    </header>
  );
};

export default Navbar;
