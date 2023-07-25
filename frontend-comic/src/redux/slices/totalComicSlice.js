// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getTotalComic } from "../action/action";

const totalComicSlice = createSlice({
    name: "totalComic",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTotalComic.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTotalComic.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getTotalComic.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default totalComicSlice.reducer;
