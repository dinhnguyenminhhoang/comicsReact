// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getOnlyChapterbyId } from "../action/action";

const chapterOnlyByIdSlice = createSlice({
  name: "chapterById",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOnlyChapterbyId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOnlyChapterbyId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getOnlyChapterbyId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default chapterOnlyByIdSlice.reducer;
