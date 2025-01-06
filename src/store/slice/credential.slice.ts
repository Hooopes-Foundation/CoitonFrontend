import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CredentialState {
  credential: {
    is_dao: boolean;
    approved: boolean;
    region: {
      None: boolean;
    };
    details: any;
  } | null;
}

const initialState: CredentialState = {
  credential: null,
};

const credentialSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setCredential: (state, action: PayloadAction<any>) => {
      state.credential = action.payload;
    },
  },
});

export const { setCredential } = credentialSlice.actions;
export default credentialSlice.reducer;
