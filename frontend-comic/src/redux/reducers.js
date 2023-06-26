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
import updateViewsSlice from "./slices/updateViewsSlice";
import chapterOnlyByIdSlice from "./slices/chapterOnlyByIdSlice.js";
import createUserSlices from "./slices/createUserSlices ";
import loginSlices from "./slices/loginSlices";
import authSlices from "./slices/authSlices";
import userInfoSlice from "./slices/userInfoSlice";
import totalUserSlice from "./slices/totalUserSlice";
import totalComicSlice from "./slices/totalComicSlice";
import totalChapterSlice from "./slices/totalChapterSlice";
import createFollowSlices from "./slices/createFollowSlices";
import comicFollowedSlice from "./slices/comicFollowedSlice";
import allUserSlice from "./slices/allUserSlice";
import deleteComicSlice from "./slices/deleteComicSlice";
import deleteUserSlice from "./slices/deleteUserSlice";
import updateUserSlice from "./slices/updateUserSlice";
import updateComicSlice from "./slices/updateComicSlice";
import followByComicSlice from "./slices/followByComicSlice";
import searchSlice from "./slices/searchSlice";
import allCommentsSlice from "./slices/allCommentsSlice";
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
  views: updateViewsSlice,
  chapterOnly: chapterOnlyByIdSlice,
  user: createUserSlices,
  login: loginSlices,
  auth: authSlices,
  userInfo: userInfoSlice,
  totalUser: totalUserSlice,
  totalComic: totalComicSlice,
  totalChapter: totalChapterSlice,
  FollowData: createFollowSlices,
  comicFollowed: comicFollowedSlice,
  allUser: allUserSlice,
  deleteComic: deleteComicSlice,
  deleteUser: deleteUserSlice,
  updateUser: updateUserSlice,
  updateComic: updateComicSlice,
  followByComic: followByComicSlice,
  searchData: searchSlice,
  allComments: allCommentsSlice,
  // Thêm reducers khác của bạn tại đây
});

export default rootReducer;
