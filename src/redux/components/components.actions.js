import actionTypes from "./components.types";

export const setComponentReference = (compRef) => ({
  type: actionTypes.setComponentRef,
  payload: compRef,
});
