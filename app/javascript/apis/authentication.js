import Axios from "./axios";

export const login = (payload) =>
  Axios.post("/sessions", {
    user: payload,
  });

export const verifyOtp = (userId, otp) =>
  Axios.post(`/users/${userId}/verify_otp`, {
    otp,
  });

export const logout = () => Axios.delete("/logout");
