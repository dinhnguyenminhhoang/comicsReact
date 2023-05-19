// actions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleGetCategory,
  handleGetTopComic,
  handleCreateComic,
  handleCreateChapter,
  handleGetAllComic,
  handleGetPagination,
  handleGetComicById,
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
