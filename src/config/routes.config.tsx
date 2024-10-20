import { layouts } from "@/layouts";
import { views } from "@/views";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    element: layouts.root,
    children: [
      {
        path: "/",
        element: views.home,
      },
      {
        path: "/about",
        element: views.about,
      },
      {
        path: "/token",
        element: views.token,
      },
      {
        path: "/team",
        element: views.team,
      },
      {
        path: "/listings",
        element: views.listings,
      },
      {
        path: "/blog",
        element: views.blog,
      },
    ],
  },
  {
    path: "/onboarding",
    element: layouts.onboarding,
    children: [
      {
        path: "/onboarding",
        element: views.stepOne,
      },
      {
        path: "/onboarding/step-two",
        element: views.stepTwo,
      },
      {
        path: "/onboarding/step-three",
        element: views.stepThree,
      },
      {
        path: "/onboarding/step-four",
        element: views.stepFour,
      },
      {
        path: "/onboarding/step-five",
        element: views.stepFive,
      },
      {
        path: "/onboarding/step-six",
        element: views.stepSix,
      },
      {
        path: "/onboarding/account",
        element: views.account,
      },
      {
        path: "/onboarding/property-management",
        element: views.propertyManagement,
      },
      {
        path: "/onboarding/get-verified",
        element: views.getVerified,
      },
      {
        path: "/onboarding/approval",
        element: views.approval,
      },
      {
        path: "/onboarding/mint",
        element: views.mint,
      },
    ],
  },
  {
    element: layouts.dashboard,
    children: [
      {
        path: "/dashboard",
        element: views.dashboard,
      },
    ],
  },
  {
    element: layouts.test,
    children: [
      {
        path: "/starknet-test",
        element: views.test,
      },
    ],
  },
]);
