// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { createFollow } from "../action/action";

const createFollowSlices = createSlice({
    name: "FollowData",
    initialState: {
        data: null,
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createFollow.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createFollow.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(createFollow.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default createFollowSlices.reducer;
