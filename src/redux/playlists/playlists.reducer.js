import actionTypes from "./playlists.types";
import { ratePlaylist } from "../../firebase/firebase.utils";

const INITIAL_STATE = { playlists: [] };

const playlistReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PLAYLISTS:
      return { ...state, playlists: [...state.playlists, action.payload] };
    case actionTypes.LIKE_PLAYLIST:
      const ratedPlaylist = state.playlists.filter(
        (playlist) => playlist.id === action.payload
      )[0];
      ratePlaylist(action.payload);
      ratedPlaylist.rating = ratedPlaylist.rating + 1;
      state.playlists = [
        ...state.playlists.filter((playlist) => playlist.id !== action.payload),
        ratedPlaylist,
      ];
      return { ...state };
    default:
      return { ...state };
  }
};

// const pushPlaylist = (state, playlist) => {
//     var list = [...state.playlist, ]
// }

export default playlistReducer;
