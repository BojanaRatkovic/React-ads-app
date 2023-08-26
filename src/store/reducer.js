import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { quoteSlice } from "./quoteSlice";
import { themeSlice } from "./themeSlice";
import { adSlice } from "./adSlice";

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  quote: quoteSlice.reducer,
  theme: themeSlice.reducer,
  ads: adSlice.reducer,
});
