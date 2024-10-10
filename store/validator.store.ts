import { create } from "zustand";
import { persist } from "zustand/middleware";

type TValidatorStore = {
  vId: number | undefined;
  setVId: (id: number) => void;
};

export const useValidatorStore = create<TValidatorStore>()(
  persist(
    (set) => ({
      vId: undefined,
      setVId: (id: number) => set({ vId: id }),
    }),
    {
      name: "validator-storage",
    }
  )
);
