import axios from "axios";
const request = axios.create({
  baseURL: "http://localhost:8080/",
});
export const get = async (path, option = {}) => {
  let res = await request.get(path, option);
  return res.data;
};
export default request;
