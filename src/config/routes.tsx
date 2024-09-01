import { createBrowserRouter } from "react-router-dom";

import HomeScreen from "@/app/screens/HomeScreen";
import RootLayout from "@/app/layouts/RootLayout";

export const routes = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomeScreen />,
      },
    ],
  },
]);
