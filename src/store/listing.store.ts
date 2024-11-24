import { create } from "zustand";

type CreateListingFormStore = {
  currentStep: number;
  direction: number;
  setCurrentStep: (step: (prevStep: number) => number) => void;
  setDirection: (dir: (prevDir: number) => number) => void;
};

export const useCreateListingFormStore = create<CreateListingFormStore>(
  (set) => ({
    currentStep: 0,
    direction: 0,
    setCurrentStep: (updateFn) =>
      set((state) => ({ currentStep: updateFn(state.currentStep) })),
    setDirection: (updateFn) =>
      set((state) => ({ direction: updateFn(state.direction) })),
  }),
);
