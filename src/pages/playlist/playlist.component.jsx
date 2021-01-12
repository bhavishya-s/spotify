import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import "./playlist.styles.scss";

import { singlePlaylistSelector } from "../../redux/playlists/playlists.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import { ratePlaylist } from "../../redux/user/user.actions";
import { addPlaylistRating } from "../../redux/playlists/playlists.actions";

import Spinner from "../../components/spinner/spinner.component";
import TrackSummary from "../../components/track-summary/track-summary.component";
import RefreshPlaylist from "../../components/playlist-refresh/playlist-refresh.component";

import { ReactComponent as Heart } from "./like.svg";

const Playlist = ({
  getSinglePlaylist,
  ratePlaylist,
  addPlaylistRating,
  currentUser,
}) => {
  var playlist = getSinglePlaylist[0];
  const [isLiked, setLiked] = useState(false);
  useEffect(() => {
    checkIsLiked();
  });
  const checkIsLiked = () => {
    if (currentUser && playlist)
      if (currentUser.ratedPlaylist.find((p) => playlist.id === p))
        setLiked(true);
  };
  const handleRating = () => {
    if (currentUser && !isLiked) {
      addPlaylistRating(playlist.id);
      ratePlaylist(playlist.id);
    }
  };
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
            <div className="bottom-row-container">
              <span className="playlist-rating-big">
                <Heart
                  className={`${isLiked ? "liked" : "null"} playlist-heart`}
                  onClick={() => handleRating()}
                />
                <span className="rating-text">{playlist.rating}</span>
              </span>
              <RefreshPlaylist playlistID={playlist.id} />
            </div>
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
  currentUser: selectCurrentUser(state),
  getSinglePlaylist: singlePlaylistSelector(ownProps.match.params.playlistID)(
    state
  ),
});

const mapDispatchToProps = (dispatch) => ({
  ratePlaylist: (playlistID) => dispatch(ratePlaylist(playlistID)),
  addPlaylistRating: (playlistID) => dispatch(addPlaylistRating(playlistID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
