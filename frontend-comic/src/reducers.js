import { combineReducers } from "redux";
// Import các reducers của bạn
import counterReducer from "~/slices/counterSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  // Thêm reducers khác của bạn tại đây
});

export default rootReducer;
