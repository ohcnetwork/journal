import { create as createApi } from "../merchants";

export const create = async (payload) => {
  try {
    const response = await createApi(payload);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};
