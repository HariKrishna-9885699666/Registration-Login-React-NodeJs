import axios from ".";

export const loginAPI = (data) => {
  return axios({
    method: "POST",
    url: `/login`,
    data,
  });
};
