import Axios from "./axios";

export const getLocalBodies = () => Axios.get(`/local_bodies`);
