// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { updateViews } from "../action/action";

const updateViewsSlice = createSlice({
    name: "views",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateViews.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateViews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(updateViews.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default updateViewsSlice.reducer;
