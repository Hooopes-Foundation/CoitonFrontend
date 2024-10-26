import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AUTH_STATE {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useAuthStore = create<AUTH_STATE>()(
  persist(
    (setFn) => ({
      isAuthenticated: false,

      setIsAuthenticated: (auth: boolean) => setFn({ isAuthenticated: auth }),
    }),
    { name: "auth_storage" },
  ),
);
