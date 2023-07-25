// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getAllComments } from "../action/action";

const allCommentsSlice = createSlice({
    name: "allUser",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllComments.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllComments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getAllComments.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default allCommentsSlice.reducer;
