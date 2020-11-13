import { createSelector } from "reselect";

export const playlistSelector = (state) => state.playlists;

export const playlistsSelector = createSelector(
  playlistSelector,
  (playlists) => playlists.playlists
);

export const singlePlaylistSelector = (collectionURLParams) =>
  createSelector(playlistsSelector, (playlist) => {
    console.log(collectionURLParams);
    return playlist.filter((p) => p.id === collectionURLParams);
  });
