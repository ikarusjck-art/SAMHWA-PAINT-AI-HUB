import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default open-access user with Admin privileges
const DEFAULT_USER: User = {
    id: 'admin-guest',
    name: '연구원 (Admin)',
    email: 'admin@samhwa.com',
    department: 'R&BD Center',
    role: 'admin', // Always admin to bypass restrictions
    level: 10,
    xp: 5000,
    maxXp: 6000
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with a fully approved Admin user to remove all restrictions
  const [user, setUser] = useState<User | null>(DEFAULT_USER);
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);

  const calculateMaxXp = (level: number) => {
    return level * 100;
  };

  const login = (name: string, email: string, department: string) => {
    // Simply update the profile info, keep admin role
    const updatedUser: User = {
      ...user!, 
      name,
      email,
      department,
      role: 'admin' // Ensure they stay admin
    };
    setUser(updatedUser);
  };

  const logout = () => {
    // In open mode, logout just resets to default guest admin identity
    setUser(DEFAULT_USER);
    alert('기본 관리자 모드로 전환되었습니다.');
  };

  const approveUser = (userId: string) => {
    // No-op in open mode as everyone is approved
    console.log("Auto-approved");
  };

  const gainXp = (amount: number) => {
    if (!user) return;
    
    let newXp = user.xp + amount;
    let newLevel = user.level;
    let newMaxXp = user.maxXp;

    if (newXp >= newMaxXp) {
        newXp -= newMaxXp;
        newLevel += 1;
        newMaxXp = calculateMaxXp(newLevel);
    }

    setUser({
        ...user,
        xp: newXp,
        level: newLevel,
        maxXp: newMaxXp
    });
  };

  // Always return true/admin properties to bypass UI locks
  const isAuthenticated = true;
  const isApproved = true;
  const isAdmin = true;

  return (
    <AuthContext.Provider value={{ user, login, logout, approveUser, gainXp, isAuthenticated, isApproved, isAdmin, pendingUsers }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};