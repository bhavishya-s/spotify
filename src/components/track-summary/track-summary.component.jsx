import React from "react";

import "./track-summary.styles.scss";

const TrackSummary = ({ track }) => {
  return (
    <div className="track-container">
      <img
        src={track.album.images[0].url}
        alt="album cover"
        className="album-img"
      />
      <div className="track-data">
        <span className="track-name">{track.name}</span>
        <div className="artist-container">
          {track.artists.map((artist) => (
            <span className="artist-name" key={artist.id}>
              {artist.name}
            </span>
          ))}
        </div>
        <span className="track-duration">
          {(track.duration_ms / 60000).toFixed(2).toString().replace(".", ":")}{" "}
          mins
        </span>
      </div>
    </div>
  );
};

export default TrackSummary;
