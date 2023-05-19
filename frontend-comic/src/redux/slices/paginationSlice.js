// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getPagination } from "../action/action";

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPagination.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPagination.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getPagination.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default paginationSlice.reducer;
