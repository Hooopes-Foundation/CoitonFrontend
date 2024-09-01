import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/assets/styles/globals.css";
import { routes } from "./config/routes";
import { RouterProvider } from "react-router-dom";
import TanstackProvider from "./providers/tanstack-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TanstackProvider>
      <RouterProvider router={routes} />
    </TanstackProvider>
  </StrictMode>
);
