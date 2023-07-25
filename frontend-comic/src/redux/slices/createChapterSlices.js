// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchCreateComic } from "../action/action";

const createChapterSlices = createSlice({
    name: "createChapter",
    initialState: {
        data: null,
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCreateComic.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCreateComic.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchCreateComic.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default createChapterSlices.reducer;
