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
        element: views.gateway,
      },
      {
        path: "/onboarding/connect-wallet",
        element: views.connect,
      },
      {
        path: "/onboarding/verification",
        element: views.verification,
      },
      {
        path: "/onboarding/liquidity",
        element: views.liquidity,
      },
      {
        path: "/onboarding/wallet-to-dao",
        element: views.dao,
      },
      {
        path: "/onboarding/wallet-to-trading",
        element: views.trading,
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
