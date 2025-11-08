import { api } from "../api";

export interface User {
  id: string;
  email: string;
  name: string;
  googleId?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const userService = {
  async getCurrentUser(): Promise<User> {
    const { data } = await api.get("/users/me");
    return data;
  },

  async getUserById(id: string): Promise<User> {
    const { data } = await api.get(`/users/${id}`);
    return data;
  },
};
