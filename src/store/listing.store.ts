import { create } from "zustand";

type CreateListingFormStore = {
  currentStep: number;
  direction: number;
  setCurrentStep: (step: (prevStep: number) => number) => void;
  setDirection: (dir: (prevDir: number) => number) => void;
};

export const useCreateListingFormStore = create<CreateListingFormStore>(
  (setFn) => ({
    currentStep: 1,
    direction: 1,

    setCurrentStep: (updateFn) =>
      setFn((state) => ({ currentStep: updateFn(state.currentStep) })),
    setDirection: (updateFn) =>
      setFn((state) => ({ direction: updateFn(state.direction) })),
  }),
);
