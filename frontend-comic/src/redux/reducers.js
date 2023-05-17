import { combineReducers } from "redux";
// Import các reducers của bạn
import counterReducer from "./slices/counterSlice";
import categorySlice from "./slices/categorySlice";
import comicSlice from "./slices/comicSlice";
import createComicSlices from "./slices/createComicSlices";
import createChapterSlices from "./slices/createChapterSlices";
const rootReducer = combineReducers({
  counter: counterReducer,
  categoryApi: categorySlice,
  comicApi: comicSlice,
  createComic: createComicSlices,
  createChapter: createChapterSlices,
  // Thêm reducers khác của bạn tại đây
});

export default rootReducer;
