// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getChapterById } from "../action/action";

const chapterByIdSlice = createSlice({
    name: "chapterById",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getChapterById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getChapterById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getChapterById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default chapterByIdSlice.reducer;
