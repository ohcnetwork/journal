import Axios from "./axios";

export const signup = (payload) => Axios.post("/signup", payload);

export const login = (payload) => Axios.post("/login", payload);

export const logout = () => Axios.delete("/logout");
