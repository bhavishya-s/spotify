import actionTypes from "./user.types";
export const setCurrentUser = (user) => ({
  type: actionTypes.setUser,
  payload: user,
});

export const logoutUser = () => ({
  type: actionTypes.logoutUser,
});
