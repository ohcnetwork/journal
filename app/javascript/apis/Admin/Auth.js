import Axios from "../axios";

let authHeaderInterceptor;

export const signIn = (payload) => Axios.post(`/admin/sessions`, payload);

const addInterceptor = (token) => {
  authHeaderInterceptor = Axios.interceptors.request.use((config) => {
    return {
      ...config,
      headers: {
        "X-Auth-Token": token,
        ...config.headers,
      },
    };
  });
};

export const isLoggedIn = () => {
  const token = localStorage.getItem("admin-auth-token");
  addInterceptor(token);
  return token;
};

export const logout = () => {
  localStorage.clear();
  if (authHeaderInterceptor) {
    Axios.interceptors.request.eject(authHeaderInterceptor);
  }
};
