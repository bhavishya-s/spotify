import btoa from "btoa";
import { addPlaylist } from "../firebase/firebase.utils";
const config = require("./spotify.config.json");

const getToken = async () => {
  const { clientID, clientSecret } = config.auth;
  const auth_token = btoa(`${clientID}:${clientSecret}`);
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "content-type": "Application/x-www-form-urlencoded",
      authorization: "Basic " + auth_token,
      Accept: "application/json",
    },
    body: `grant_type=client_credentials`,
  });
  const r = await response.json();
  return r.access_token;
};

const getData = async (playlistID) => {
  const token = await getToken();

  const playlistRequest = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistID}?market=in`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    }
  );
  const tracks_raw = await playlistRequest.json();
  const finalisedData = {
    href: tracks_raw.href,
    id: tracks_raw.id,
    image: tracks_raw.images[0].url,
    name: tracks_raw.name,
    owner: {
      name: tracks_raw.owner.display_name,
      link: tracks_raw.owner.external_urls.spotify,
      id: tracks_raw.owner.id,
    },
    tracks: tracks_raw.tracks,
    uri: tracks_raw.uri,
  };
  addPlaylist(finalisedData);
  console.log(finalisedData);
};

export { getData };
