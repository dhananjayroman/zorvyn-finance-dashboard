export const mockTransactions = [
  { id: '1', date: '2026-04-01', title: 'Salary', amount: 5000, category: 'Income', type: 'income' },
  { id: '2', date: '2026-04-02', title: 'Groceries', amount: 150, category: 'Food', type: 'expense' },
  { id: '3', date: '2026-04-02', title: 'Electric Bill', amount: 120, category: 'Utilities', type: 'expense' },
  { id: '4', date: '2026-04-03', title: 'Restaurant', amount: 65, category: 'Food', type: 'expense' },
  { id: '5', date: '2026-04-03', title: 'Freelance Project', amount: 1200, category: 'Income', type: 'income' },
  { id: '6', date: '2026-04-04', title: 'Gym Membership', amount: 50, category: 'Fitness', type: 'expense' },
  { id: '7', date: '2026-04-04', title: 'Uber', amount: 25, category: 'Transport', type: 'expense' },
  { id: '8', date: '2026-04-05', title: 'Internet', amount: 60, category: 'Utilities', type: 'expense' },
  { id: '9', date: '2026-04-06', title: 'Coffee Shop', amount: 12, category: 'Food', type: 'expense' },
  { id: '10', date: '2026-04-06', title: 'Dividend', amount: 300, category: 'Income', type: 'income' },
];

export const fetchTransactionsMock = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockTransactions]);
    }, 600); // Simulate network delay
  });
};
