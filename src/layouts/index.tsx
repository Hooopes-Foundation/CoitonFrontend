import DashboardLayout from "./(dashboard)/DashboardLayout";
import OnboardingLayout from "./(onboarding)/OnboardingLayout";
import RootLayout from "./(public)/RootLayout";
import TestLayout from "./(starknet)/TestLayout";

export const layouts = {
  root: <RootLayout />,
  test: <TestLayout />,
  onboarding: <OnboardingLayout />,
  dashboard: <DashboardLayout />,
};
