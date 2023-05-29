import thunkMiddleware from "redux-thunk";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { localStorageMiddleware } from "./middleware/auth";
import rootReducer from "./reducers";
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;

// Áp dụng middleware cho store
