import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteAds: [],
  reportedAds: [],
};

export const adSlice = createSlice({
  name: "ads",
  initialState: initialState,
  reducers: {
    setFavoriteAd(state, action) {
      const ad = action.payload;
      const favIds = state.favoriteAds.map((item) => item.id);
      if (!favIds.includes(ad.id)) {
        state.favoriteAds.push(ad);
      }
      return state;
    },
    setReportedAd(state, action) {
      const reportData = action.payload;
      state.reportedAds.push(reportData);
      return state;
    },
    clearFavorites(state, action) {
      state.favoriteAds = [];
      return state;
    },
  },
});

export default adSlice;
