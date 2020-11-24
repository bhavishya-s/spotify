import { combineReducers } from "redux";
import playlistReducer from "./playlists/playlists.reducer";
import componentReducer from "./components/components.reducer";
import userReducer from "./user/user.reducer";

export default combineReducers({
  playlists: playlistReducer,
  components: componentReducer,
  user: userReducer,
});
