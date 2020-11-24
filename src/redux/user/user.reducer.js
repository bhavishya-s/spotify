import actionTypes from "./user.types";
const INITIAL_STATE = { currentUser: undefined };

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.setUser:
      return { ...state, currentUser: action.payload };
    default:
      return { ...state };
  }
};
export default userReducer;
