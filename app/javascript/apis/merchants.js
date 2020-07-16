import axios from "axios";

export const create = (payload) => axios.post("/api/v1/merchants", payload);
