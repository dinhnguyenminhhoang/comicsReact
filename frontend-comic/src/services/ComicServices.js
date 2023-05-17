import axios from "../utils/instance";
const handleGetCategory = () => {
  return axios.get(`/api/getCetagory`);
};
const handleGetTopComic = () => {
  return axios.get(`/api/getComic`);
};
const handleCreateComic = (data) => {
  return axios.post(`/api/create-comic`, data);
};
const handleCreateChapter = (data) => {
  return axios.post(`/api/create-chapter`, data);
};
export {
  handleGetCategory,
  handleGetTopComic,
  handleCreateComic,
  handleCreateChapter,
};
