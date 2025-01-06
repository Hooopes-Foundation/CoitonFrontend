import { configureStore } from "@reduxjs/toolkit";
import listingReducer from "./slice/listing.slice";
import habitReducer from "./slice/habit.slice";
import walletReducer from "./slice/wallet.slice";
import newListingReducer from "./slice/new-listing.slice";
import modalReducer from "./slice/modal.slice";
import onboardingReducer from "./slice/onboarding.slice";
import credentialReducer from "./slice/credential.slice";

const store = configureStore({
  reducer: {
    habits: habitReducer,
    listing: listingReducer,
    wallet: walletReducer,
    newListing: newListingReducer,
    modal: modalReducer,
    onboarding: onboardingReducer,
    credential: credentialReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
