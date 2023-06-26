// actions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleGetCategory,
  handleGetTopComic,
  handleCreateComic,
  handleCreateChapter,
  handleCreateComic_Categories,
  handleGetAllComic,
  handleGetPagination,
  handleGetComicById,
  handleGetChapterById,
  handleGetComicByCategory,
  handleGetCategoriesByComic,
  handleUpdateViews,
  handlerGetOnlyChapterById,
  handleUpdateTimePass,
  handleLogin,
  handleGetTotalUser,
  handleGetTotalComic,
  handleGetTotalChapter,
  handleUpdateComic,
  handleDeleteComic,
  handleGetFollowByComic,
  handlerSearch,
} from "~/services/ComicServices";
import {
  handleGetAllUser,
  handleGetUserInfo,
  handleGetComicFollow,
  handleCreateUser,
  handleCreateFollow,
  handleUpdateUser,
  handleDeleteUser,
  handleGetAllComments,
  handleCreateComment,
  handleDeleteComment,
  handleUpdateComment,
} from "~/services/UserServices";
// Action creator sử dụng createAsyncThunk
export const fetchCategoryData = createAsyncThunk(
  "category/fetchCategoryData",
  async () => {
    try {
      const response = await handleGetCategory(); // Gửi yêu cầu API
      return response.data; // Trả về dữ liệu nhận được từ API
    } catch (error) {
      throw error;
    }
  }
);
export const getTopComic = createAsyncThunk(
  "comic/getTopComic",
  async (limit) => {
    try {
      const response = await handleGetTopComic(limit);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getAllComic = createAsyncThunk(
  "allComic/getAllComic",
  async () => {
    try {
      const response = await handleGetAllComic();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getAllUser = createAsyncThunk("allUser/getAllUser", async () => {
  try {
    const response = await handleGetAllUser();
    return response.data;
  } catch (error) {
    throw error;
  }
});
export const getPagination = createAsyncThunk(
  "pagination/getPagination",
  async (data) => {
    try {
      let pageNumber = data.pageNumber;
      let pageSize = data.pageSize;
      const response = await handleGetPagination(+pageNumber, +pageSize);
      return response;
    } catch (error) {
      throw error;
    }
  }
);
export const getComicById = createAsyncThunk(
  "comicById/getComicById",
  async (id) => {
    try {
      const response = await handleGetComicById(+id);
      return response;
    } catch (error) {
      throw error;
    }
  }
);
export const getChapterById = createAsyncThunk(
  "chapter/getChapterById",
  async (id) => {
    try {
      const response = await handleGetChapterById(+id);
      return response;
    } catch (error) {
      throw error;
    }
  }
);
export const getComicByCategory = createAsyncThunk(
  "comicByCategory/getComicByCategory",
  async (categoryId) => {
    try {
      const response = await handleGetComicByCategory(+categoryId);
      return response;
    } catch (error) {
      throw error;
    }
  }
);
export const getCategoriesByComic = createAsyncThunk(
  "categoriesByComic/getCategoriesByComic",
  async (comicId) => {
    try {
      const response = await handleGetCategoriesByComic(+comicId);
      return response;
    } catch (error) {
      throw error;
    }
  }
);
export const getOnlyChapterbyId = createAsyncThunk(
  "chapterOnly/getOnlyChapterbyId",
  async (data) => {
    try {
      let chapterId = data.chapterId;
      let comicId = data.comicId;
      const response = await handlerGetOnlyChapterById(+chapterId, +comicId);
      return response;
    } catch (error) {
      throw error;
    }
  }
);
export const authLogin = createAsyncThunk("login/authLogin", async (data) => {
  try {
    const response = await handleLogin(data);
    return response;
  } catch (error) {
    throw error;
  }
});
export const getTotalUser = createAsyncThunk(
  "totalUser/getTotalUser",
  async () => {
    try {
      const response = await handleGetTotalUser();
      return response;
    } catch (error) {
      throw error;
    }
  }
);
export const getTotalComic = createAsyncThunk(
  "totalComic/getTotalComic",
  async () => {
    try {
      const response = await handleGetTotalComic();
      return response;
    } catch (error) {
      throw error;
    }
  }
);
export const getTotalChapter = createAsyncThunk(
  "chapter/getTotalChapter",
  async () => {
    try {
      const response = await handleGetTotalChapter();
      return response;
    } catch (error) {
      throw error;
    }
  }
);
export const getUserInfo = createAsyncThunk(
  "userInfo/getUserInfo",
  async (email) => {
    try {
      const response = await handleGetUserInfo(email);
      return response;
    } catch (error) {
      throw error;
    }
  }
);
export const getComicFollowed = createAsyncThunk(
  "comicFollowed/getComicFollowed",
  async (userId) => {
    try {
      const response = await handleGetComicFollow(userId);
      return response;
    } catch (error) {
      throw error;
    }
  }
);
export const getFollowByComic = createAsyncThunk(
  "followByComic/getFollowByComic",
  async (comicId) => {
    try {
      const response = await handleGetFollowByComic(comicId);
      return response;
    } catch (error) {
      throw error;
    }
  }
);
export const getAllComments = createAsyncThunk(
  "allComments/getAllComments",
  async (comicId) => {
    try {
      const response = await handleGetAllComments(comicId);
      return response;
    } catch (error) {
      throw error;
    }
  }
);
export const searchApi = createAsyncThunk(
  "searchData/searchApi",
  async (data) => {
    try {
      let searchContent = data.searchContent;
      let type = data.type;
      const response = await handlerSearch(searchContent, type);
      return response;
    } catch (error) {
      throw error;
    }
  }
);
//
export const fetchCreateComic = createAsyncThunk(
  "createComic/fetchCreateComic",
  async (data) => {
    try {
      const response = await handleCreateComic(data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const fetchCreateChapter = createAsyncThunk(
  "createChapter/fetchCreateChapter",
  async (data) => {
    try {
      const response = await handleCreateChapter(data);
      return response;
    } catch (error) {
      throw error;
    }
  }
);
export const createComic_categories = createAsyncThunk(
  "comic_categories/createComic_categories",
  async (data) => {
    try {
      const response = await handleCreateComic_Categories(data);
      return response;
    } catch (error) {
      throw error;
    }
  }
);
export const createUser = createAsyncThunk("user/createUser", async (data) => {
  try {
    const response = await handleCreateUser(data);
    return response;
  } catch (error) {
    throw error;
  }
});
export const createFollow = createAsyncThunk(
  "FollowData/createFollow",
  async (data) => {
    try {
      const response = await handleCreateFollow(data);
      return response;
    } catch (error) {
      throw error;
    }
  }
);
export const createComment = createAsyncThunk(
  "FollowData/createFollow",
  async (data) => {
    try {
      const response = await handleCreateComment(data);
      return response;
    } catch (error) {
      throw error;
    }
  }
);
//update
export const updateViews = createAsyncThunk(
  "views/updateViews",
  async (comicId) => {
    try {
      const response = await handleUpdateViews(comicId);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const updateTimePass = createAsyncThunk(
  "timePass/updateTimePass",
  async (comicId) => {
    try {
      const response = await handleUpdateTimePass(comicId);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const updateComic = createAsyncThunk(
  "updateComic/updateComic",
  async (comicInfo) => {
    try {
      const response = await handleUpdateComic(comicInfo);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const updateUser = createAsyncThunk(
  "updateUser/updateUser",
  async (comicInfo) => {
    try {
      const response = await handleUpdateUser(comicInfo);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const updateComment = createAsyncThunk(
  "updateComment/updateComment",
  async (comment) => {
    try {
      const response = await handleUpdateComment(comment);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteComic = createAsyncThunk(
  "deletecomic/deleteComic",
  async (comicId) => {
    try {
      const response = await handleDeleteComic(comicId);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const deleteUser = createAsyncThunk(
  "deleteUser/deleteUser",
  async (userId) => {
    try {
      const response = await handleDeleteUser(userId);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const deleteComment = createAsyncThunk(
  "deleteComment/deleteComment",
  async (commentId) => {
    try {
      const response = await handleDeleteComment(commentId);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
