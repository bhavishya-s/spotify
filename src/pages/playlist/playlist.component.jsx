import React from "react";
import { connect } from "react-redux";

import "./playlist.styles.scss";
import { singlePlaylistSelector } from "../../redux/playlists/playlists.selectors";
import { ratePlaylist } from "../../redux/playlists/playlists.actions";

import Spinner from "../../components/spinner/spinner.component";
import TrackSummary from "../../components/track-summary/track-summary.component";

import { ReactComponent as Heart } from "./like.svg";

const Playlist = ({ getSinglePlaylist, ratePlaylist, match }) => {
  var playlist = getSinglePlaylist[0];

  return playlist ? (
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
            <span className="playlist-rating-big">
              <Heart
                className="playlist-heart"
                onClick={() => ratePlaylist(playlist.id)}
              />
              {playlist.rating}
            </span>
          </div>
        </div>
        <div className="tracks-container">
          {playlist.tracks.items.map((track) => (
            <TrackSummary track={track.track} key={track.track.id} />
          ))}
        </div>
      </div>
    </>
  ) : (
    <Spinner />
  );
};

const mapStateToProps = (state, ownProps) => ({
  getSinglePlaylist: singlePlaylistSelector(ownProps.match.params.playlistID)(
    state
  ),
});

const mapDispatchToProps = (dispatch) => ({
  ratePlaylist: (playlistID) => dispatch(ratePlaylist(playlistID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
