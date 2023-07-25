// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { searchApi } from "../action/action";

const searchSlice = createSlice({
    name: "allComic",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchApi.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(searchApi.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(searchApi.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default searchSlice.reducer;
