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
} from "~/services/ComicServices";

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
