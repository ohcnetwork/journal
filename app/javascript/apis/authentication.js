import axios from "axios";

export const signup = payload => axios.post("/api/v1/signup", payload);

export const login = payload => axios.post("/api/v1/login", payload);

export const logout = () => axios.delete("/api/v1/logout");
