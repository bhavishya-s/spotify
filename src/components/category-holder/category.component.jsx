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
          NEWLY ADDED
        </span>
        <div className="playlists">
          {categoryNew(playlists)
            .filter((i, inx) => inx < 5)
            .map((playlist, idx) => (
              <PlaylistSummary
                playlistData={playlist}
                key={idx}
                color={color}
              />
            ))}
        </div>
      </div>
      <div className="category-section">
        <span className="category-title" style={color}>
          OTHERS
        </span>
        <div className="playlists">
          {playlists
            .filter((i, inx) => inx < 6)
            .map((playlist, idx) => (
              <PlaylistSummary
                playlistData={playlist}
                key={idx}
                color={color}
              />
            ))}
        </div>
      </div>
    </>
  );
};

const categoryNew = (playlists) => {
  return playlists.sort((a, b) => {
    if (a.addedAt.toDate() > b.addedAt.toDate()) return -1;
    else return 1;
  });
};

const mapStateToProps = (state) => ({
  playlists: playlistsSelector(state),
});

export default connect(mapStateToProps)(PlaylistCategory);
