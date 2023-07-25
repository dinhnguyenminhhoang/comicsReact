// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { updateComic } from "../action/action";

const updateComicSlice = createSlice({
    name: "updateComic",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateComic.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateComic.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(updateComic.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default updateComicSlice.reducer;
