import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: null,
    fullName: null,
    email: null,
    isAdmin: false,
  },
  ads: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setData(state, action) {
      const data = action.payload;
      state.user = data.user;
      state.ads = data.ads;
    },
    logout(state, action) {
      return initialState;
    },
  },
});

export default authSlice;
