import Axios from "./axios";

export const show = (id) => Axios.get(`/users/${id}`);
