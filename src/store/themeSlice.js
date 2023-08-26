import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTheme: "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    toggleTheme(state, action) {
      if (state.selectedTheme === "light") {
        state.selectedTheme = "dark";
      } else {
        state.selectedTheme = "light";
      }
    },
  },
});

export default themeSlice;
