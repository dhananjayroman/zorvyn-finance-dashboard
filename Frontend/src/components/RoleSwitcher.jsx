import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, ShieldAlert } from 'lucide-react';

const RoleSwitcher = () => {
  const { role, toggleRole, isAdmin } = useAuth();

  return (
    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700">
      <button
        onClick={() => role !== 'Admin' && toggleRole()}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
          isAdmin
            ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm border border-gray-200 dark:border-gray-600'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
        }`}
      >
        <ShieldAlert size={14} />
        Admin
      </button>
      <button
        onClick={() => role !== 'Viewer' && toggleRole()}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
          !isAdmin
            ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm border border-gray-200 dark:border-gray-600'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
        }`}
      >
        <Shield size={14} />
        Viewer
      </button>
    </div>
  );
};

export default RoleSwitcher;
