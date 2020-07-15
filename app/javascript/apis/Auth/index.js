import { login as userLogin } from "../authentication";
import { show as userShow } from "../users";

const currentUserLoggedIn = async localUserId => {
  try {
    await userShow(localUserId);
    return true;
  } catch (err) {
    return false;
  }
};

const localUser = () => {
  return JSON.parse(localStorage.getItem("currentUser")) || {};
};

const setLocalUser = user => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const isLoggedIn = async () => {
  const localUserId = localUser().id;
  return localUserId ? await currentUserLoggedIn(localUserId) : false;
};

export const login = async payload => {
  const response = await userLogin(payload);
  setLocalUser(response.data.user);
};

export const logout = () => {
  localStorage.removeItem("currentUser");
};
