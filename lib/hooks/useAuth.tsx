'use client';

import { useState, useEffect } from 'react';
import { authService, User } from '../services/auth.service';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authService.isAuthenticated()) {
      authService
        .getCurrentUser()
        .then(setUser)
        .catch(() => authService.logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = () => {
    authService.initiateGoogleAuth();
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return { user, loading, login, logout, isAuthenticated: !!user };
}