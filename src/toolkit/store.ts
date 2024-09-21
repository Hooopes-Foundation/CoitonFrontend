import { configureStore } from "@reduxjs/toolkit";
import walletSlice from "./slice/walletSlice";

const store = configureStore({
  reducer: {
    wallet: walletSlice,
    // token: tokenReducer,
  },
});

export default store;
