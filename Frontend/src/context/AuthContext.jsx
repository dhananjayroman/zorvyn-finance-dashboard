import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState('Admin'); // Default to Admin for demonstration

  const toggleRole = () => setRole((prev) => (prev === 'Admin' ? 'Viewer' : 'Admin'));
  const isAdmin = role === 'Admin';

  return (
    <AuthContext.Provider value={{ role, toggleRole, isAdmin, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
