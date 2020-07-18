import Axios from "./axios";

let authHeaderInterceptor = null;

export const login = (payload) =>
  Axios.post("/sessions", {
    user: payload,
  });

export const verifyOtp = async (userId, otp) => {
  const response = await Axios.post(`/users/${userId}/verify_otp`, {
    otp,
  });
  if (response.data) {
    const currentUser = response.data;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    authHeaderInterceptor = Axios.interceptors.request.use((config) => {
      return {
        ...config,
        headers: {
          "X-Auth-Token": currentUser.authentication_token,
          ...config.headers,
        },
      };
    });
  }
};

export const logout = async () => {
  localStorage.clear();
  if (authHeaderInterceptor) {
    Axios.interceptors.request.eject(authHeaderInterceptor);
  }
};
