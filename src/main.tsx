import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import "@/styles/index.css";
import store from "./store";
import { StarknetProvider } from "./components/providers/starknet.provider";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <StarknetProvider>
        <App />
      </StarknetProvider>
    </Provider>
  </StrictMode>
);
