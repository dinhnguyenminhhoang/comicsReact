// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { updateTimePass } from "../action/action";

const updateTimePassSlice = createSlice({
    name: "timePass",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateTimePass.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateTimePass.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(updateTimePass.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default updateTimePassSlice.reducer;
