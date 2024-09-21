import { createSlice } from "@reduxjs/toolkit";

const initialState: TInitialeState = {
  address: null,
  connected: false,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    connectWallet: (state, action) => {
      state.address = action.payload;
      state.connected = true;
    },
    disconnectWallet: (state) => {
      state.address = null;
      state.connected = false;
    },
  },
});

export const { connectWallet, disconnectWallet } = walletSlice.actions;
export default walletSlice.reducer;
