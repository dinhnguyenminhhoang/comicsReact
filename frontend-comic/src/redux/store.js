import thunkMiddleware from "redux-thunk";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware, ...getDefaultMiddleware()],
});

export default store;
