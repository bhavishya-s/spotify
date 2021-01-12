import React from "react";

import { updatePlaylistData } from "../../spotify/spotify.utils";

import "./playlist-refresh.styles.scss";
import { ReactComponent as Refresh } from "./refresh-page-option.svg";

const RefreshPlaylist = ({ playlistID }) => {
  return (
    <span
      className="refresh-button"
      onClick={() => updatePlaylistData(playlistID)}
    >
      <span className="refresh-button-text">
        <Refresh className="refresh-svg" /> Refresh
      </span>
    </span>
  );
};

export default RefreshPlaylist;
