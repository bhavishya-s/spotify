import actionTypes from "./user.types";
const INITIAL_STATE = { currentUser: undefined };

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.setUser:
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      return { ...state, currentUser: action.payload };
    case actionTypes.logoutUser:
      localStorage.removeItem("currentUser");
      return { ...state, currentUser: null };
    default:
      return { ...state };
  }
};
export default userReducer;
