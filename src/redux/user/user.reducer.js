import actionTypes from "./user.types";
import { addUserRated } from "../../firebase/firebase.utils";

const INITIAL_STATE = {};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.setUser:
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      return { ...state, currentUser: action.payload };
    case actionTypes.logoutUser:
      localStorage.removeItem("currentUser");
      return { ...state, currentUser: null };
    case actionTypes.ratePlaylist:
      addUserRated(state.currentUser, action.payload);
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ratedPlaylist: [...state.currentUser.ratedPlaylist, action.payload],
        },
      };
    default:
      return { ...state };
  }
};
export default userReducer;
