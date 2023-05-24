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
import chapterByIdSlice from "./slices/chapterByIdSlice";
import createComic_categoriesSlice from "./slices/createComic_categoriesSlice";
import comicByCategorySlice from "./slices/comicByCategorySlice";
import categoriesByComicSlice from "./slices/categoriesByComicSlice";
const rootReducer = combineReducers({
  counter: counterReducer,
  categoryApi: categorySlice,
  comicApi: comicSlice,
  createComic: createComicSlices,
  createChapter: createChapterSlices,
  allComic: allComicSlice,
  pagination: paginationSlice,
  comicById: comicByIdSlice,
  chapterById: chapterByIdSlice,
  comic_categories: createComic_categoriesSlice,
  comicByCategory: comicByCategorySlice,
  categoriesByComic: categoriesByComicSlice,
  // Thêm reducers khác của bạn tại đây
});

export default rootReducer;
