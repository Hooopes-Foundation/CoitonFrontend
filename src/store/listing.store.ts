import { create } from "zustand";

type STEP_STATE = {
  currentStep: number;
  completedSteps: number[];
};

interface INITIAL_LISTING_STATE {
  stepState: STEP_STATE;

  setStepState: (stepId: number, steps: any[]) => void;
}

export const useListingStore = create<INITIAL_LISTING_STATE>()((set) => ({
  stepState: {
    currentStep: 1,
    completedSteps: [],
  },

  setStepState: (stepId: number, steps: any[]) => {
    set((state) => {
      const { currentStep, completedSteps } = state.stepState;
      const updatedCompletedSteps = [...completedSteps, stepId];

      const nextStep = stepId < steps.length ? stepId + 1 : currentStep;

      return {
        stepState: {
          currentStep: nextStep,
          completedSteps: updatedCompletedSteps,
        },
      };
    });
  },
}));
