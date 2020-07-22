import Axios from "../axios";

export const create = async (payload) => {
  try {
    const response = await Axios.post("/merchants", {
      ...payload,
      lb_code: payload.local_body.value,
      district: undefined,
      local_body: undefined,
      type: undefined,
    });
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};
