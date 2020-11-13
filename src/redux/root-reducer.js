import { combineReducers } from "redux";
import playlistReducer from "./playlists/playlists.reducer";

export default combineReducers({ playlists: playlistReducer });
