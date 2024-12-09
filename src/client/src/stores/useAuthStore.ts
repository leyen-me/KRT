import { create } from "zustand";
import { AUTHORIZATION_KEY } from "@/constants";
import { fetchSysAuthLogout } from "@/api/sys/auth";
export type AuthStore = {
  token: string;
  isAuthenticated: boolean;

  setToken: (token: string) => void;
  logout: () => void;
  checkAuth: () => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  token: localStorage.getItem(AUTHORIZATION_KEY) || "",
  isAuthenticated: false,

  setToken: (token: string) => {
    localStorage.setItem(AUTHORIZATION_KEY, token);
    set({ token, isAuthenticated: true });
  },

  logout: async () => {
    await fetchSysAuthLogout();
    localStorage.removeItem(AUTHORIZATION_KEY);
    set({ token: "", isAuthenticated: false });
  },

  checkAuth: () => {
    const token = localStorage.getItem(AUTHORIZATION_KEY);
    if (token) {
      set({ token, isAuthenticated: true });
    }
  },
}));

export { useAuthStore };
