import axios from ".";

export const registerAPI = (data) => {
  return axios({
    method: "POST",
    url: `/register`,
    data,
  });
};
