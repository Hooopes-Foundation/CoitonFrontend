import { CREATE_LISTING_SCHEMA } from "@/lib/validators";
import { create } from "zustand";

type CreateListingFormStore = {
  formState: CREATE_LISTING_SCHEMA;
  currentStep: number;
  updateField: (
    field: keyof CREATE_LISTING_SCHEMA,
    value: string | number | File[], // accommodate files as well
  ) => void;
  setCurrentStep: (step: number) => void;
  incrementStep: () => void;
  resetForm: () => void;
};

const initialState: CREATE_LISTING_SCHEMA = {
  email: "coiton@gmail.com",
  phone: "+234 123 456 7890",
  social: "@COiTON",
  occupation: "Real-Estate Trading Platform",
  location: "Ikorodu Igbogbo",
  state: "Lagos State",
  postalCode: "494949",
  price: "999",
  bedrooms: "4",
  bathrooms: "4",
  parkingSpot: "2",
  constructionSqft: "542",
  landSqft: "532",
  description: "Property's description",
  images: [],
  files: [],
};

export const useCreateListingFormStore = create<CreateListingFormStore>(
  (setFn) => ({
    formState: initialState,
    currentStep: 0,
    updateField: (field, value) =>
      setFn((state) => ({ formState: { ...state.formState, [field]: value } })),
    setCurrentStep: (step: number) =>
      setFn(() => ({
        currentStep: Math.max(0, Math.min(step, 3)),
      })),
    incrementStep: () =>
      setFn((state) => ({
        currentStep: Math.min(state.currentStep + 1, 3),
      })),
    resetForm: () => setFn({ formState: initialState, currentStep: 0 }),
  }),
);
