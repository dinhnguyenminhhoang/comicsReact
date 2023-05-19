import { combineReducers } from "redux";
// Import các reducers của bạn
import counterReducer from "./slices/counterSlice";
import categorySlice from "./slices/categorySlice";
import comicSlice from "./slices/comicSlice";
import createComicSlices from "./slices/createComicSlices";
import createChapterSlices from "./slices/createChapterSlices";
import allComicSlice from "./slices/allComicSlice";
import paginationSlice from "./slices/paginationSlice";
import comicByIdSlice from "./slices/comicByIdSlice";
const rootReducer = combineReducers({
  counter: counterReducer,
  categoryApi: categorySlice,
  comicApi: comicSlice,
  createComic: createComicSlices,
  createChapter: createChapterSlices,
  allComic: allComicSlice,
  pagination: paginationSlice,
  comicById: comicByIdSlice,
  // Thêm reducers khác của bạn tại đây
});

export default rootReducer;
