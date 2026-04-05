import React from 'react';
import { ArrowUpDown, Edit2, Trash2 } from 'lucide-react';

const TransactionTable = ({ transactions, isAdmin, handleSort, onDelete, onEdit }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden mb-10 pb-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 hidden sm:table-row">
              <th className="py-4 px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={() => handleSort('date')}>
                <div className="flex items-center gap-2">Date <ArrowUpDown size={14}/></div>
              </th>
              <th className="py-4 px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={() => handleSort('title')}>
                <div className="flex items-center gap-2">Title <ArrowUpDown size={14}/></div>
              </th>
              <th className="py-4 px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
              <th className="py-4 px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
              <th className="py-4 px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={() => handleSort('amount')}>
                <div className="flex items-center justify-end gap-2 text-right">Amount <ArrowUpDown size={14}/></div>
              </th>
              {isAdmin && <th className="py-4 px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 6 : 5} className="py-8 text-center text-gray-500 dark:text-gray-400">
                  No transactions found.
                </td>
              </tr>
            ) : (
              transactions.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors group flex flex-col sm:table-row py-4 sm:py-0">
                  <td className="py-2 sm:py-4 px-6 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap block sm:table-cell">
                    <span className="sm:hidden font-semibold">Date: </span> {t.date}
                  </td>
                  <td className="py-2 sm:py-4 px-6 text-sm font-medium text-gray-900 dark:text-white block sm:table-cell">
                     <span className="sm:hidden font-semibold">Title: </span> {t.title}
                  </td>
                  <td className="py-2 sm:py-4 px-6 text-sm block sm:table-cell">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                      {t.category}
                    </span>
                  </td>
                  <td className="py-2 sm:py-4 px-6 text-sm block sm:table-cell">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      t.type === 'income' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {t.type.charAt(0).toUpperCase() + t.type.slice(1)}
                    </span>
                  </td>
                  <td className={`py-2 sm:py-4 px-6 text-sm font-semibold whitespace-nowrap block sm:table-cell sm:text-right ${
                    t.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'
                  }`}>
                    <span className="sm:hidden font-semibold text-gray-500">Amount: </span>
                    {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                  </td>
                  {isAdmin && (
                    <td className="py-2 sm:py-4 px-6 text-sm text-right whitespace-nowrap block sm:table-cell border-t sm:border-0 border-gray-100 dark:border-gray-800 mt-2 sm:mt-0">
                      <div className="flex justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <button onClick={() => onEdit(t)} className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded-lg transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => onDelete(t.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
