import axios from "axios";

export const show = id => axios.get(`/api/v1/users/${id}`);
