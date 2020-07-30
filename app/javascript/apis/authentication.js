import Axios from "./axios";

import { show as userShow } from "./users";

let authHeaderInterceptor = null;

export const login = (payload) =>
  Axios.post("/sessions", {
    user: payload,
  });

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

const getLocalUser = () => {
  return JSON.parse(localStorage.getItem("currentUser"));
};

export const isLoggedIn = async () => {
  const currentUser = getLocalUser();
  if (!currentUser) {
    return false;
  }
  const { id, authentication_token } = currentUser;
  addInterceptor(authentication_token);
  try {
    await userShow(id);
    return true;
  } catch (err) {
    return false;
  }
};

export const verifyOtp = async (userId, otp) => {
  const response = await Axios.post(`/users/${userId}/verify_otp`, {
    otp,
  });
  if (response.data) {
    const currentUser = response.data;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    addInterceptor(currentUser.authentication_token);
  }
};

export const logout = async () => {
  localStorage.clear();
  if (authHeaderInterceptor) {
    Axios.interceptors.request.eject(authHeaderInterceptor);
  }
};
