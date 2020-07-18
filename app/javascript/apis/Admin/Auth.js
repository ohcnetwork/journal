import Axios from "../axios";

export const signIn = (payload) => Axios.post(`/admin/sessions`, payload);
