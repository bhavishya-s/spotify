import React, { useState } from "react";

import { getData } from "../../spotify/spotify.utils";
import "./add-playlist-popup.styles.scss";

const AddPlaylistPopup = () => {
  const [playlistField, updatePlaylistField] = useState("");

  const HandleChange = (e) => {
    updatePlaylistField(e.target.value);
  };
  const HandleSubmit = (e) => {
    if (
      playlistField.match(
        /https?:\/\/open.spotify.com\/playlist\/\w*\?[\w\s=-]*/g
      )
    ) {
      const playlistID = playlistField.split("/")[4].match(/\w*/)[0];
      getData(playlistID).then((d) => console.log(d));
    } else if (playlistField.match(/\w/)) {
      const playlistID = playlistField;
      getData(playlistID).then((d) => console.log(d));
    } else {
      console.log("Format not recognized.");
    }
  };
  return (
    <div className="playlist-popup">
      <input
        name="playlist"
        type="text"
        placeholder="Playlist ID/URL"
        value={playlistField}
        className="playlist-input"
        onChange={HandleChange}
      ></input>
      <button className="playlist-submit" onClick={HandleSubmit}>
        ADD PLAYLIST
      </button>
    </div>
  );
};

export default AddPlaylistPopup;
