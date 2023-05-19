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
//post
const handleCreateComic = (data) => {
  return axios.post(`/api/create-comic`, data);
};
const handleCreateChapter = (data) => {
  return axios.post(`/api/create-chapter`, data);
};
export {
  handleGetCategory,
  handleGetTopComic,
  handleGetAllComic,
  handleGetPagination,
  handleGetComicById,
  //
  handleCreateComic,
  handleCreateChapter,
};
