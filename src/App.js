import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import { retrievePlaylist } from "./firebase/firebase.utils.js";
// import { getData } from "./spotify/spotify.utils";
import { addPlaylist } from "./redux/playlists/playlists.actions";

import Header from "./components/header/header.component";
import Homepage from "./pages/homepage/homepage.component";
import Playlist from "./pages/playlist/playlist.component";

function App({ addPlaylist }) {
  useEffect(() => {
    getPlaylists();
  });
  const getPlaylists = async () => {
    const playlists = await retrievePlaylist();
    playlists.map((playlist) => {
      addPlaylist(playlist.data());
      return 0;
    });
  };

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/:playlistID" component={Playlist} />
      </Switch>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  addPlaylist: (playlist) => dispatch(addPlaylist(playlist)),
});

export default connect(null, mapDispatchToProps)(App);
