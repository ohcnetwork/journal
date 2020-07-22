import Axios from "../axios";

export const create = async (payload) => {
  try {
    const response = await Axios.post("/merchants", payload);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};
