// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { checkUserFollow } from "../action/action";

const checkUserFollowSlice = createSlice({
    name: "checkUserFollow",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(checkUserFollow.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkUserFollow.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(checkUserFollow.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default checkUserFollowSlice.reducer;
