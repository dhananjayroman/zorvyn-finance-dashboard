import React, { useState, useMemo } from 'react';
import { useTransactions } from '../context/TransactionContext';
import { useAuth } from '../context/AuthContext';
import { Search, Plus } from 'lucide-react';
import TransactionTable from '../components/TransactionTable';
import TransactionForm from '../components/TransactionForm';
import Toast from '../components/Toast';

const TransactionsPage = () => {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions();
  const { isAdmin } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Toast State
  const [toast, setToast] = useState({ isVisible: false, message: '' });

  const showToast = (message) => {
    setToast({ isVisible: true, message });
  };

  // Get unique categories for dropdown
  const categories = ['All', ...new Set(transactions.map(t => t.category))];

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedData = useMemo(() => {
    let result = transactions.filter(t => {
      const matchSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = categoryFilter === 'All' || t.category === categoryFilter;
      const matchType = typeFilter === 'All' || t.type === typeFilter;
      return matchSearch && matchCategory && matchType;
    });

    result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [transactions, searchTerm, categoryFilter, typeFilter, sortConfig]);

  const handleOpenAddModal = () => {
    setSelectedTransaction(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      showToast('Transaction deleted');
    } catch (err) {
      showToast('Error: Failed to delete transaction');
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      if (selectedTransaction) {
        await updateTransaction({ ...data, id: selectedTransaction.id });
        showToast('Transaction updated successfully');
      } else {
        await addTransaction(data);
        showToast('Transaction added successfully');
      }
    } catch (err) {
      showToast('Error: Failed to save transaction');
      throw err;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 w-full h-full p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Transactions</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and track your recent transactions.</p>
        </div>
        {isAdmin && (
          <button 
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm focus:ring-4 focus:ring-primary-500/20"
          >
            <Plus size={18} />
            Add Transaction
          </button>
        )}
      </div>

      {/* Filters Base */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by title or category..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary-500 transition-shadow dark:text-gray-200 outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none cursor-pointer text-gray-700 dark:text-gray-200"
          >
            <option value="All">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none cursor-pointer text-gray-700 dark:text-gray-200"
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>

      {/* Extracted Table */}
      <TransactionTable 
        transactions={filteredAndSortedData} 
        isAdmin={isAdmin} 
        handleSort={handleSort} 
        onEdit={handleOpenEditModal} 
        onDelete={handleDelete}
      />

      {/* Modal Form */}
      <TransactionForm 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedTransaction}
      />

      {/* Toast Notification */}
      <Toast 
        message={toast.message} 
        isVisible={toast.isVisible} 
        onClose={() => setToast({ ...toast, isVisible: false })} 
      />
    </div>
  );
};

export default TransactionsPage;
