// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getAllComic } from "../action/action";

const allComicSlice = createSlice({
  name: "allComic",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllComic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllComic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getAllComic.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default allComicSlice.reducer;
