import React, { createContext, useContext, useEffect, useReducer, useCallback } from 'react';

const TransactionContext = createContext();

const initialState = {
  transactions: [],
  loading: true,
  error: null,
};

function transactionReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, transactions: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'DELETE_TRANSACTION':
      return { 
        ...state, 
        transactions: state.transactions.filter(t => t.id !== action.payload) 
      };
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(t => 
          t.id === action.payload.id ? action.payload : t
        )
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

// Helper to map MongoDB _id to id, and format date
const formatData = (item) => ({
  ...item,
  id: item._id,
  date: new Date(item.date).toISOString().split('T')[0]
});

export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  const API_URL = 'http://localhost:5000/api/transactions';

  const fetchTransactions = useCallback(async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const response = await fetch(`${API_URL}?limit=1000`);
      if (!response.ok) throw new Error('Failed to fetch transactions');
      const json = await response.json();
      
      const formattedData = json.data.map(formatData).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      dispatch({ type: 'FETCH_SUCCESS', payload: formattedData });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: err.message });
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const addTransaction = async (transactionData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transactionData),
      });
      if (!response.ok) throw new Error('Failed to add transaction');
      
      const json = await response.json();
      dispatch({ type: 'ADD_TRANSACTION', payload: formatData(json.data) });
      return json.data;
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
      throw err;
    }
  };

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete transaction');
      
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
      throw err;
    }
  };

  const updateTransaction = async (transactionData) => {
    try {
      const response = await fetch(`${API_URL}/${transactionData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transactionData),
      });
      if (!response.ok) throw new Error('Failed to update transaction');
      
      const json = await response.json();
      dispatch({ type: 'UPDATE_TRANSACTION', payload: formatData(json.data) });
      return json.data;
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
      throw err;
    }
  };

  return (
    <TransactionContext.Provider value={{
      ...state,
      addTransaction,
      deleteTransaction,
      updateTransaction,
      fetchTransactions,
    }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionContext);
