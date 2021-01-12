import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import { retrievePlaylist, getUserData } from "./firebase/firebase.utils.js";

import { addPlaylist } from "./redux/playlists/playlists.actions";
import { setCurrentUser } from "./redux/user/user.actions";

import Header from "./components/header/header.component";
import Homepage from "./pages/homepage/homepage.component";
import Playlist from "./pages/playlist/playlist.component";
import LoginPage from "./pages/login/login.component";
import UserProfilePage from "./pages/user-profile/user-profile.component";
function App({ addPlaylist, setUser }) {
  useEffect(() => {
    getPlaylists();
    checkUser();
  });

  const checkUser = async () => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser && currentUser !== "undefined") {
      const user = await getUserData(JSON.parse(currentUser));
      setUser(user);
    }
  };
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
      <div className="page-wrapper">
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/user/:userID" component={UserProfilePage} />
          <Route exact path="/:playlistID/" component={Playlist} />
        </Switch>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  addPlaylist: (playlist) => dispatch(addPlaylist(playlist)),
  setUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(null, mapDispatchToProps)(App);
