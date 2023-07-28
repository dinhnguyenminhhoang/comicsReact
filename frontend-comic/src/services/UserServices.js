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
const handleGetAllComments = (comicId) => {
    return axios.get(`/api/get-comment?comicId=${comicId}`);
};
const handleCheckUserFollow = (data) => {
    return axios.get(
        `/api/check-user-followed?userId=${data.userId}&comicId=${data.comicId}`
    );
};
//
const handleCreateUser = (data) => {
    return axios.post(`/api/create-user`, data);
};
const handleCreateFollow = (data) => {
    return axios.post(`/api/create-follow`, data);
};
const handleCreateComment = (data) => {
    return axios.post(`/api/create-comment`, data);
};
//update
const handleUpdateUser = (userInfo) => {
    return axios.put(`/api/update-user`, userInfo);
};
const handleUpdateComment = (comment) => {
    return axios.put(`/api/update-comment`, comment);
};
//delete
const handleDeleteUser = (userId) => {
    return axios.delete(`/api/delete-user?userId=${userId}`);
};
const handleDeleteComment = (commentId) => {
    return axios.delete(`/api/delete-comment?commentId=${commentId}`);
};
export {
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
    handleCheckUserFollow,
};
