// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getComicById } from "../action/action";

const comicByIdSlice = createSlice({
    name: "comicById",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getComicById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getComicById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getComicById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default comicByIdSlice.reducer;
