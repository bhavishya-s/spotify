import React from "react";
import { withRouter } from "react-router-dom";
import "./playlist-summary.styles.scss";

const PlaylistSummary = ({ history, playlistData, color }) => {
  return (
    <div
      className="playlist-summary-container"
      style={color}
      onClick={() => history.push(`/playlist/${playlistData.id}`)}
    >
      <img className="playlist-image" alt="playlist" src={playlistData.image} />
      <span className="playlist-title">{playlistData.name}</span>
      <span className="playlist-author">By {playlistData.owner.name}</span>
    </div>
  );
};

export default withRouter(PlaylistSummary);
