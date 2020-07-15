import axios from "axios";

axios.defaults.headers = {
  "Content-Type": "application/json",
};
export const setAxiosIntercepts = () => {
  axios.interceptors.response.use(
    function (response) {
      if (response.status === 200) {
        response.success = true;
      }
      return response;
    },
    function (error) {
      if (401 === error.response.status) {
        // Redirect to login route
        return Promise.reject(error);
      } else {
        return Promise.reject(error);
      }
    }
  );
};
