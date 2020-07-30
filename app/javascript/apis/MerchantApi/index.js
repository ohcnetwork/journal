import Axios from "../axios";

export const create = async (payload) => {
  const response = await Axios.post("/merchants", {
    ...payload,
    lb_code: payload.local_body.value,
    district: undefined,
    local_body: undefined,
    type: undefined,
  });
  return response;
};

export const verifyOtp = async (tempId, otp) => {
  return await Axios.post(`/merchants/${tempId}/verify_otp`, null, {
    params: {
      otp,
    },
  });
};
