import Axios from "../axios";

export const getRouteMapOfUser = (phone_number, date_of_birth) => {
  return Axios.post(`/admin/users/route_map`, {
    phone_number,
    date_of_birth,
  });
};
