// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getComicByCategory } from "../action/action";

const comicByCategorySlice = createSlice({
  name: "comicByCategory",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComicByCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComicByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getComicByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default comicByCategorySlice.reducer;
