import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import "./header.styles.scss";

import AddPlaylistPopup from "../add-playlist-popup/add-playlist-popup.component";

const Header = ({ history }) => {
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
          <ul className="nav-item on-right">Log In</ul>
          <ul className="nav-item on-right" onClick={toggleLogIn}>
            Add Playlist
          </ul>
          {loginPopup ? <AddPlaylistPopup /> : null}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Header);
