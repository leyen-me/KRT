import { create } from "zustand";

export type AuthStore = {
  token: string;
  isAuthenticated: boolean;

  setToken: (token: string) => void;
  logout: () => void;
  checkAuth: () => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  token: localStorage.getItem("token") || "",
  isAuthenticated: false,

  setToken: (token: string) => {
    localStorage.setItem("token", token);
    set({ token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: "", isAuthenticated: false });
  },

  checkAuth: () => {
    const token = localStorage.getItem("token");
    if (token) {
      set({ token, isAuthenticated: true });
    }
  },
}));

export { useAuthStore };
