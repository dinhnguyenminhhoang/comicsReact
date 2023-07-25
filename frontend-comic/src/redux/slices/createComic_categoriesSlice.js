// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { createComic_categories } from "../action/action";

const createComic_categoriesSlice = createSlice({
    name: "comic_categories",
    initialState: {
        data: null,
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createComic_categories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createComic_categories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(createComic_categories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default createComic_categoriesSlice.reducer;
