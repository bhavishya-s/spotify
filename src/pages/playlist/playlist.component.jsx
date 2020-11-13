import React from "react";
import { connect } from "react-redux";
import { singlePlaylistSelector } from "../../redux/playlists/playlists.selectors";

import TrackSummary from "../../components/track-summary/track-summary.component";

import "./playlist.styles.scss";

const Playlist = ({ getSinglePlaylist, match }) => {
  const playlist = getSinglePlaylist[0];
  console.log(playlist);
  return (
    <>
      <div className="playlist-container">
        <div className="playlist-description-container">
          <img
            src={playlist.image}
            className="playlist-image-big"
            alt="playlistimage"
          />
          <div className="playlist-description-text">
            <span className="playlist-name-big">{playlist.name}</span>
            <span className="playlist-author-big">{playlist.owner.name}</span>
          </div>
        </div>
        <div className="tracks-container">
          {playlist.tracks.items.map((track) => (
            <TrackSummary track={track.track} key={track.track.id} />
          ))}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => ({
  getSinglePlaylist: singlePlaylistSelector(ownProps.match.params.playlistID)(
    state
  ),
});

export default connect(mapStateToProps)(Playlist);
