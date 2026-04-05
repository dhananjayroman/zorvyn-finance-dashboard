import React from 'react';
import { useTransactions } from '../context/TransactionContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Target, CreditCard } from 'lucide-react';

const InsightsPage = () => {
  const { transactions } = useTransactions();

  // Compute stats
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const totalSavings = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((totalSavings / totalIncome) * 100).toFixed(1) : 0;

  // Highest spending category
  const expenseByCategory = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});
  
  const highestCategoryObj = Object.entries(expenseByCategory).reduce((max, current) => {
    return current[1] > max[1] ? current : max;
  }, ['', 0]);
  
  const highestCategory = highestCategoryObj[0];
  const highestCategoryAmount = highestCategoryObj[1];

  // Monthly income vs expense data for Bar Chart
  const monthlyData = transactions.reduce((acc, curr) => {
    const month = new Date(curr.date).toLocaleString('default', { month: 'short' });
    let existing = acc.find(item => item.name === month);
    if (!existing) {
      existing = { name: month, income: 0, expense: 0 };
      acc.push(existing);
    }
    if (curr.type === 'income') existing.income += curr.amount;
    else existing.expense += curr.amount;
    return acc;
  }, []).reverse(); // assuming simple mock data

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 w-full h-full p-4 sm:p-6 lg:p-8 pb-12">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Insights & Analytics</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Deep dive into your financial habits.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {/* Savings Card */}
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 shadow-md text-white relative overflow-hidden group hover:shadow-lg transition-all">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-white opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
          <div className="relative z-10 flex items-center justify-between mb-4">
            <h3 className="font-medium text-primary-100">Total Savings</h3>
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Target size={20} className="text-white" />
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">${totalSavings.toLocaleString()}</p>
          <div className="flex items-center gap-2 mt-4 text-sm font-medium bg-black/20 w-fit px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
            <TrendingUp size={16} />
            <span>{savingsRate}% savings rate</span>
          </div>
        </div>

        {/* Highest Spend Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 transition-all hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Top Spend Category</h3>
            <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 rounded-xl flex items-center justify-center">
              <CreditCard size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1 truncate">{highestCategory || 'N/A'}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-3 mt-3">
            <span className="font-semibold text-gray-900 dark:text-gray-300">${(highestCategoryAmount || 0).toLocaleString()}</span> spent so far
          </p>
        </div>

        {/* Comparison Summary Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-center transition-all hover:shadow-md">
          <div className="mb-2">
            <div className="flex justify-between items-end mb-1">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Income</span>
              <span className="text-sm font-semibold text-green-600 dark:text-green-500">${totalIncome.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
              <div className="bg-green-500 h-2 rounded-full transition-all duration-1000" style={{ width: totalIncome > 0 ? '100%' : '0%' }}></div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-end mb-1">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Expense</span>
              <span className="text-sm font-semibold text-red-600 dark:text-red-500">${totalExpenses.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
              <div className="bg-red-500 h-2 rounded-full transition-all duration-1000" style={{ width: totalIncome > 0 ? `${Math.min((totalExpenses/totalIncome)*100, 100)}%` : '0%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart section */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 mt-6 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Monthly Comparison</h3>
        <div className="h-[22rem] w-full pb-4">
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-gray-800" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: 'var(--tw-prose-bg)' }}
                  cursor={{fill: 'transparent'}}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={50} />
                <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
             <p className="text-gray-500 text-center pt-20">No comparison data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;
