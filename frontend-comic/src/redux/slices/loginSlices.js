// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { authLogin } from "../action/action";

const loginSlices = createSlice({
    name: "login",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(authLogin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(authLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(authLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default loginSlices.reducer;
