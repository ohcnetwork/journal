import Axios from "./axios";

export const userOngoingVisits = () => Axios.get(`/visits/ongoing`);

export const exitVisit = (id) => Axios.put(`/visits/${id}/exit`);
