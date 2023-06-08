// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getTotalUser } from "../action/action";

const totalUserSlice = createSlice({
  name: "totalUser",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTotalUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTotalUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getTotalUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default totalUserSlice.reducer;
