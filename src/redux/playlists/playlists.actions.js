import actionTypes from "./playlists.types";

export const addPlaylist = (item) => ({
  type: actionTypes.FETCH_PLAYLISTS,
  payload: item,
});
