import Axios from "../axios";
import moment from "moment";

export const getRouteMapOfUser = async ({ phone_number, date_of_birth }) => {
  const user = await getUser({ phone_number, date_of_birth });
  if (user) {
    const response = (await Axios.get(`/admin/users/${user.id}/route_map`))
      .data;
    return response;
  }
  throw new Error("RouteMap not found");
};

const getUser = async ({ phone_number, date_of_birth }) => {
  try {
    const age = moment().diff(date_of_birth, "years");
    const response = (
      await Axios.get(`/admin/users?phone=${phone_number}&age=${age}`)
    ).data;
    const user = response.users[0];
    return user;
  } catch (err) {
    console.log("Error while fetching user ", err);
    throw err;
  }
};

export const getEstablishmentRegister = async ({ visitable_id, from, to }) => {
  const dateFrom = moment(from).format("YYYY-MM-DD");
  const dateTo = moment(to).format("YYYY-MM-DD");
  try {
    const response = (
      await Axios.get(
        `/admin/visits?visitable_id=${visitable_id}&visitable_type=Merchant&from=${dateFrom}&to=${dateTo}`
      )
    ).data;
    return response;
  } catch (err) {
    console.log("Error while fetching Establishment ", err);
    throw new Error("Establishment not found");
  }
};
