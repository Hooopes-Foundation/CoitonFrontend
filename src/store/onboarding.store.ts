import { create } from "zustand";

type OnboardingStore = {
  step: number;
  isAuthenticated: boolean;
  setStep: (step: (prevStep: number) => number) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};

export const useOnboardingStore = create<OnboardingStore>((setFn) => ({
  step: 1,
  isAuthenticated: false,
  setStep: (updateFn) => setFn((state) => ({ step: updateFn(state.step) })),
  setIsAuthenticated: (auth: boolean) => setFn({ isAuthenticated: auth }),
}));

// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface AUTH_STATE {
//   isAuthenticated: boolean;
//   setIsAuthenticated: (isAuthenticated: boolean) => void;
// }

// export const useAuthStore = create<AUTH_STATE>()(
//   (setFn) => ({
//     isAuthenticated: false,

//     setIsAuthenticated: (auth: boolean) => setFn({ isAuthenticated: auth }),
//   }),
//   // persist(
//   //   { name: "auth_storage" },
//   // ),
// );
