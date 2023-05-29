// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { createUser } from "../action/action";

const createUserSlices = createSlice({
  name: "user",
  initialState: {
    data: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error state when the request is pending
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null; // Reset error state on successful response
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default createUserSlices.reducer;
