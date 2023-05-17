// actions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleGetCategory,
  handleGetTopComic,
  handleCreateComic,
  handleCreateChapter,
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
export const getTopComic = createAsyncThunk("comic/getTopComic", async () => {
  try {
    const response = await handleGetTopComic();
    return response.data;
  } catch (error) {
    throw error;
  }
});
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
