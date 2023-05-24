// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getCategoriesByComic } from "../action/action";

const categoriesByComicSlice = createSlice({
  name: "categoriesByComic",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesByComic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategoriesByComic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getCategoriesByComic.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default categoriesByComicSlice.reducer;
