import React, { useState } from "react";

import { getData } from "../../spotify/spotify.utils";
import "./add-playlist-popup.styles.scss";

// import AlertBox from "../alert-box/alert-box.component";
const AddPlaylistPopup = () => {
  const [playlistField, updatePlaylistField] = useState("");
  const HandleChange = (e) => {
    updatePlaylistField(e.target.value);
  };
  const HandleSubmit = (e) => {
    if (
      /^https?:\/\/open.spotify.com\/playlist\/\w*\?[\w\s=-]*/.test(
        playlistField
      )
    ) {
      const playlistID = playlistField.split("/")[4].match(/\w*/)[0];
      getData(playlistID).then((d) => console.log(d));
      window.location.reload(false);
    } else if (/^\w*$/.test(playlistField)) {
      const playlistID = playlistField;
      getData(playlistID).then((d) => console.log(d));
      window.location.reload(false);
    } else {
      console.log("error");
    }
    updatePlaylistField("");
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
