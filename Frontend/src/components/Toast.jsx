import React, { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

const Toast = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-lg rounded-xl p-4 flex items-center gap-3">
        <div className="text-green-500 bg-green-50 dark:bg-green-500/10 p-1.5 rounded-full">
          <CheckCircle2 size={18} />
        </div>
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{message}</p>
      </div>
    </div>
  );
};

export default Toast;
