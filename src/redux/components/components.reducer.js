import actionTypes from "./components.types";

const INITIAL_STATE = {};

const componentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.setComponentRef:
      return { ...action.payload, ...state };
    default:
      return { ...state };
  }
};

export default componentReducer;
