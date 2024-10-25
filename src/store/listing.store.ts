import { create } from "zustand";
import { z } from "zod";

// Define the form schemas
export const clientInfoSchema = z.object({
  email: z.string().email().min(2).max(50),
  phone: z.string().refine((value) => !isNaN(Number(value))),
  social: z.string().min(2).max(50),
  occupation: z.string().min(2).max(50),
});

export const documentOneSchema = z.object({
  location: z.string().min(2).max(50),
  state: z.string().min(2).max(50),
  zip: z.string().refine((value) => !isNaN(Number(value))),
  price: z.string().refine((value) => !isNaN(Number(value))),
  bedroom: z.string().refine((value) => !isNaN(Number(value))),
  bathroom: z.string().refine((value) => !isNaN(Number(value))),
  parking: z.string().refine((value) => !isNaN(Number(value))),
  construction: z.string().refine((value) => !isNaN(Number(value))),
  land: z.string().refine((value) => !isNaN(Number(value))),
  description: z.string().min(2).max(50),
});

export const documentTwoSchema = z.object({
  flat: z.string().min(2).max(50),
  rooms: z.string().refine((value) => !isNaN(Number(value))),
  security: z.string().min(2).max(50),
});

export type ClientInfo = z.infer<typeof clientInfoSchema>;
export type DocumentOne = z.infer<typeof documentOneSchema>;
export type DocumentTwo = z.infer<typeof documentTwoSchema>;

type STEP_STATE = {
  currentStep: number;
  completedSteps: number[];
};

interface INITIAL_LISTING_STATE {
  stepState: STEP_STATE;
  formData: {
    clientInfo: Partial<ClientInfo>;
    documentOne: Partial<DocumentOne>;
    documentTwo: Partial<DocumentTwo>;
  };
  setStepState: (stepId: number) => void;
  goToPreviousStep: () => void;
  updateClientInfo: (data: Partial<ClientInfo>) => void;
  updateDocumentOne: (data: Partial<DocumentOne>) => void;
  updateDocumentTwo: (data: Partial<DocumentTwo>) => void;
}

export const useListingStore = create<INITIAL_LISTING_STATE>()((set) => ({
  stepState: {
    currentStep: 1,
    completedSteps: [],
  },
  formData: {
    clientInfo: {},
    documentOne: {},
    documentTwo: {},
  },

  setStepState: (stepId: number) =>
    set((state) => {
      const { currentStep, completedSteps } = state.stepState;
      const updatedCompletedSteps = completedSteps.includes(stepId)
        ? completedSteps
        : [...completedSteps, stepId];
      const nextStep =
        currentStep < updatedCompletedSteps.length + 1
          ? currentStep + 1
          : currentStep;

      return {
        stepState: {
          currentStep: nextStep,
          completedSteps: updatedCompletedSteps,
        },
      };
    }),

  goToPreviousStep: () =>
    set((state) => {
      const { currentStep } = state.stepState;
      if (currentStep > 1) {
        return {
          stepState: {
            ...state.stepState,
            currentStep: currentStep - 1,
          },
        };
      }
      return state;
    }),

  updateClientInfo: (data: Partial<ClientInfo>) =>
    set((state) => ({
      formData: {
        ...state.formData,
        clientInfo: { ...state.formData.clientInfo, ...data },
      },
    })),

  updateDocumentOne: (data: Partial<DocumentOne>) =>
    set((state) => ({
      formData: {
        ...state.formData,
        documentOne: { ...state.formData.documentOne, ...data },
      },
    })),

  updateDocumentTwo: (data: Partial<DocumentTwo>) =>
    set((state) => ({
      formData: {
        ...state.formData,
        documentTwo: { ...state.formData.documentTwo, ...data },
      },
    })),
}));
