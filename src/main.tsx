import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/assets/styles/globals.css";
import { routes } from "./config/routes";
import { RouterProvider } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./toolkit/store";
import { StarknetProvider } from "./providers/starknet-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <StarknetProvider>
        <RouterProvider router={routes} />
      </StarknetProvider>
    </Provider>
  </StrictMode>
);
