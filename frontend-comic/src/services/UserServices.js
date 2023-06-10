import axios from "../utils/instance";
const handleGetAllUser = () => {
  return axios.get(`/api/getAllUser`);
};
const handleGetUserInfo = (email) => {
  return axios.get(`/api/get-infoUser?email=${email}`);
};
const handleGetComicFollow = (userId) => {
  return axios.get(`/api/get-follow?userId=${userId}`);
};
const handleCreateUser = (data) => {
  return axios.post(`/api/create-user`, data);
};
const handleCreateFollow = (data) => {
  return axios.post(`/api/create-follow`, data);
};
const handleUpdateUser = (userInfo) => {
  return axios.put(`/api/update-user`, userInfo);
};
//delete
const handleDeleteUser = (comicId) => {
  return axios.delete(`/api/delete-user?comicId=${comicId}`);
};
export {
  handleGetAllUser,
  handleGetUserInfo,
  handleGetComicFollow,
  handleCreateUser,
  handleCreateFollow,
  handleUpdateUser,
  handleDeleteUser,
};
