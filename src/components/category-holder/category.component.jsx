import React from "react";
import { connect } from "react-redux";
import { playlistsSelector } from "../../redux/playlists/playlists.selectors";

import PlaylistSummary from "../playlist-summary/playlist-summary.component.jsx";

import "./category.styles.scss";

const PlaylistCategory = ({ playlists, color }) => {
  return (
    <>
      <div className="category-section">
        <span className="category-title" style={color}>
          category.title
        </span>
        <div className="playlists">
          {playlists.map((playlist, idx) => (
            <PlaylistSummary playlistData={playlist} key={idx} color={color} />
          ))}
        </div>
        <div className="playlists"></div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  playlists: playlistsSelector(state),
});

export default connect(mapStateToProps)(PlaylistCategory);
