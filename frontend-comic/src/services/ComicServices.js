import axios from "../utils/instance";
const handleGetCategory = () => {
  return axios.get(`/api/getCetagory`);
};
const handleGetTopComic = (limit) => {
  return axios.get(`/api/getComic?limit=${limit}`);
};
const handleGetAllComic = () => {
  return axios.get(`/api/getAllComic`);
};
const handleGetPagination = (pageNumber, pageSize) => {
  return axios.get(
    `/api/getPagination?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );
};
const handleGetComicById = (id) => {
  return axios.get(`/api/getComicById?id=${id}`);
};
const handleGetChapterById = (id) => {
  return axios.get(`/api/getChapterById?id=${id}`);
};
const handleGetComicByCategory = (categoryId) => {
  return axios.get(`/api/getComicByCategory?categoryId=${categoryId}`);
};
const handleGetCategoriesByComic = (comicId) => {
  return axios.get(`/api/getCategoriesByComic?comicId=${comicId}`);
};
const handlerGetOnlyChapterById = (chapterId, comicId) => {
  return axios.get(
    `/api/getOnlyChapterbyId?chapterId=${chapterId}&comicId=${comicId}`
  );
};
const handleGetUserInfo = (email) => {
  return axios.get(`/api/get-infoUser?email=${email}`);
};
const handleLogin = (data) => {
  return axios.post(`/api/auth/login`, data);
};
const handleGetTotalUser = () => {
  return axios.get(`/api/getTotalUser`);
};
const handleGetTotalComic = () => {
  return axios.get(`/api/getTotalComic`);
};
const handleGetTotalChapter = () => {
  return axios.get(`/api/getTotalChapter`);
};
const handleGetComicFollow = (userId) => {
  return axios.get(`/api/get-follow?userId=${userId}`);
};
const handleGetFollowByComic = (comicId) => {
  return axios.get(`/api/get-followForComic?comicId=${comicId}`);
};
//post
const handleCreateComic = (data) => {
  return axios.post(`/api/create-comic`, data);
};
const handleCreateChapter = (data) => {
  return axios.post(`/api/create-chapter`, data);
};
const handleCreateComic_Categories = (data) => {
  return axios.post(`/api/create-categories-comic`, data);
};

const handleCreateFollow = (data) => {
  return axios.post(`/api/create-follow`, data);
};
const handlerSearch = (searchContent, type) => {
  return axios.get(`/api/search?searchContent=${searchContent}&type=${type}`);
};
//put
const handleUpdateViews = (comicId) => {
  return axios.put(`/api/update-views?comicId=${comicId}`);
};
const handleUpdateTimePass = (comicId) => {
  return axios.put(`/api/day-update?comicId=${comicId}`);
};
const handleUpdateComic = (comicInfo) => {
  return axios.put(`/api/update-comic`, comicInfo);
};
//delete
const handleDeleteComic = (comicId) => {
  return axios.delete(`/api/delete-comic?comicId=${comicId}`);
};
export {
  handleGetCategory,
  handleGetTopComic,
  handleGetAllComic,
  handleGetPagination,
  handleGetComicById,
  handleGetChapterById,
  handleGetComicByCategory,
  handleGetCategoriesByComic,
  handlerGetOnlyChapterById,
  handleLogin,
  handleGetUserInfo,
  handleGetTotalUser,
  handleGetTotalComic,
  handleGetTotalChapter,
  handleGetComicFollow,
  handleGetFollowByComic,
  handlerSearch,
  //
  handleCreateComic,
  handleCreateChapter,
  handleCreateComic_Categories,
  handleCreateFollow,
  //
  handleUpdateViews,
  handleUpdateTimePass,
  handleUpdateComic,
  //delete
  handleDeleteComic,
};
