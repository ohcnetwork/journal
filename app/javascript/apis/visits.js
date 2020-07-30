import Axios from "./axios";

export const userOngoingVisits = () => Axios.get(`/visits/ongoing`);

export const exitVisit = (id) => Axios.put(`/visits/${id}/exit`);

export const logVisit = (visitableId, visitableType) =>
  Axios.post(`/visits`, {
    visitable_type: visitableType,
    visitable_id: visitableId,
  });
