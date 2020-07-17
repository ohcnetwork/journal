import Axios from "./axios";

export const create = (payload) => Axios.post("/merchants", payload);
