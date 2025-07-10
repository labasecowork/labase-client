import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  avatar: string | null;
  email: string;
  userType: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  deleteUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  deleteUser: () => set({ user: null }),
}));
