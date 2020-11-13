import actionTypes from "./playlists.types";

const INITIAL_STATE = { playlists: [] };

const playlistReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PLAYLISTS:
      return { ...state, playlists: [...state.playlists, action.payload] };
    default:
      return { ...state };
  }
};

// const pushPlaylist = (state, playlist) => {
//     var list = [...state.playlist, ]
// }

export default playlistReducer;
