import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { logoutUser } from "../../redux/user/user.actions";

import { handleLogin } from "../../spotify/spotify.utils";

import "./header.styles.scss";

import AddPlaylistPopup from "../add-playlist-popup/add-playlist-popup.component";

const Header = ({ history, currentUser, logoutUser }) => {
  const [loginPopup, toggleLoginPopup] = useState(false);
  const toggleLogIn = () => {
    toggleLoginPopup(!loginPopup);
  };
  return (
    <div className="header-container">
      <div className="navigation">
        <div className="nav-left">
          <ul className="nav-item on-left" onClick={() => history.push("/")}>
            HOME
          </ul>
        </div>
        <div className="nav-right">
          {currentUser ? (
            <>
              <ul className="nav-item on-right" onClick={() => logoutUser()}>
                {currentUser.name}
              </ul>
              <ul className="nav-item on-right" onClick={toggleLogIn}>
                Add Playlist
              </ul>
            </>
          ) : (
            <ul className="nav-item on-right" onClick={() => handleLogin()}>
              LOG IN
            </ul>
          )}
          {loginPopup ? <AddPlaylistPopup /> : null}
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
});
const mapStateToProps = (state) => ({ currentUser: state.user.currentUser });
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
