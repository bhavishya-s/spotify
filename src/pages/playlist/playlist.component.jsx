import React from "react";
import { connect } from "react-redux";

import "./playlist.styles.scss";
import { singlePlaylistSelector } from "../../redux/playlists/playlists.selectors";
import { ratePlaylist } from "../../redux/playlists/playlists.actions";
import { setComponentReference } from "../../redux/components/components.actions";

import Spinner from "../../components/spinner/spinner.component";
import TrackSummary from "../../components/track-summary/track-summary.component";

import { ReactComponent as Heart } from "./like.svg";

const Playlist = ({ getSinglePlaylist, ratePlaylist, setRef, match }) => {
  var playlist = getSinglePlaylist[0];
  const playlistRef = new React.useRef();

  return playlist ? (
    <>
      <div className="playlist-container">
        <div className="playlist-description-container">
          <img
            src={playlist.image}
            className="playlist-image-big"
            alt="playlistimage"
            ref={playlistRef}
            onClick={() => setRef({ playlist: playlistRef.current })}
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

// function OnScroll(div) {
//   // var d1 = document.getElementsByClassName("tracks-container");
//   // var d2 = document.getElementsByClassName("playlist-container");
//   // //F
//   var h = div.target.offsetHeight;
//   console.log(h);
//   h = h / 2;
//   div.target.style.height = `${h}px`;
//   console.log(`${h}`);
//   // d1[0].scrollTop = d2[0].scrollTop;
// }

const mapStateToProps = (state, ownProps) => ({
  getSinglePlaylist: singlePlaylistSelector(ownProps.match.params.playlistID)(
    state
  ),
});

const mapDispatchToProps = (dispatch) => ({
  ratePlaylist: (playlistID) => dispatch(ratePlaylist(playlistID)),
  setRef: (playlistRef) => dispatch(setComponentReference(playlistRef)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
