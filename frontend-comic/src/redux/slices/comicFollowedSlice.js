// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getComicFollowed } from "../action/action";

const comicFollowedSlice = createSlice({
  name: "comicFollowed",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComicFollowed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComicFollowed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getComicFollowed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default comicFollowedSlice.reducer;
