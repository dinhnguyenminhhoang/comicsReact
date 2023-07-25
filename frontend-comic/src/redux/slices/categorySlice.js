// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchCategoryData } from "../action/action";

const categorySlice = createSlice({
    name: "category",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoryData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCategoryData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchCategoryData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default categorySlice.reducer;
