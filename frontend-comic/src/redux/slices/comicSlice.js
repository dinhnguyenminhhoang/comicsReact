// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getTopComic } from "../action/action";

const comicSlice = createSlice({
  name: "comic",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTopComic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTopComic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getTopComic.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default comicSlice.reducer;
