import actionTypes from "./user.types";
export const setCurrentUser = (user) => ({
  type: actionTypes.setUser,
  payload: user,
});
