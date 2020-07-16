import Axios from "./axios";

export const userOngoingVisits = () => Axios.get(`/visits/ongoing`);
