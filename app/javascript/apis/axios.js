import axios from "axios";
import { Toastr } from "NitroUI";
import get from "lodash/get";

axios.defaults.headers = {
  "Content-Type": "application/json",
};
export const setAxiosIntercepts = () => {
  axios.interceptors.response.use(
    function(response) {
      if (response.status === 200) {
        response.success = true;
      }
      if (response.data.notice) {
        Toastr.show(response.data.notice);
      }
      return response;
    },
    function(error) {
      if (401 === error.response.status) {
        // Redirect to login route
        return Promise.reject(error);
      } else {
        Toastr.error(get(error, "response.data.error", error.message));
        return Promise.reject(error);
      }
    }
  );
};
