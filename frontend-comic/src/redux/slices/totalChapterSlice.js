// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getTotalChapter } from "../action/action";

const totalChapterSlice = createSlice({
  name: "totalChapter",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTotalChapter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTotalChapter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getTotalChapter.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default totalChapterSlice.reducer;
