// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchCreateChapter } from "../action/action";

const createComicSlices = createSlice({
  name: "createComic",
  initialState: {
    data: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateChapter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCreateChapter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchCreateChapter.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default createComicSlices.reducer;
