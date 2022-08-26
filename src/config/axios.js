import axios from "axios";

const setupAxios = () => {
  const baseURL = `https://nodejs-signup-signin-apis.up.railway.app/api/v1`;

  const instance = axios.create({
    baseURL,
  });

  instance.interceptors.request.use((config) => {
    const customConfig = config;
    customConfig.baseURL = baseURL;
    customConfig.headers = {
      "Content-Type": "application/json",
    };

    return customConfig;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        console.log("auth failed");
      } else {
        return Promise.reject(error);
      }
    }
  );

  return instance;
};

export default setupAxios;
