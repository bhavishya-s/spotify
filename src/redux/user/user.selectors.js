import { createSelector } from "reselect";

const selectUser = (state) => state.user;

const selectCurrentUser = createSelector(selectUser, (user) => user.currenUser);

const selectRatedPlaylists = createSelector(
  selectCurrentUser,
  (currentUser) => currentUser.ratedPlaylists
);
