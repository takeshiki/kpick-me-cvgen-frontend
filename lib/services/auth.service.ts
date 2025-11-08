import { api } from '../api';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export const authService = {
  async getCurrentUser(): Promise<User> {
    const { data } = await api.get('/auth/me');
    return data;
  },

  initiateGoogleAuth() {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  },

  setToken(token: string) {
    localStorage.setItem('auth_token', token);
    document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`;
  },

  getToken() {
    return localStorage.getItem('auth_token');
  },

  logout() {
    localStorage.removeItem('auth_token');
    document.cookie = 'auth_token=; path=/; max-age=0';
    window.location.href = '/';
  },

  isAuthenticated() {
    return !!this.getToken();
  },
};