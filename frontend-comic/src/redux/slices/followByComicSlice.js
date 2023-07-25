// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getFollowByComic } from "../action/action";

const followByComicSlice = createSlice({
    name: "comicFollowed",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFollowByComic.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFollowByComic.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getFollowByComic.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default followByComicSlice.reducer;
