import axios from "axios";

export const wordlyApi = axios.create({
  baseURL: "http://localhost:5000",
});

export const ImageUp = (userid, file) =>
  axios({
    method: "post",
    url: `http://localhost:5000/image?userid=${userid}`,
    file: file,
  });
