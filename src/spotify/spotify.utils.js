import btoa from "btoa";
import {
  addPlaylist,
  updatePlaylist,
  addUser,
} from "../firebase/firebase.utils";
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

export const handleLogin = () => {
  const { clientID } = config.auth;
  window.open(
    `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=code&redirect_uri=http://127.0.0.1:3000/login&scope=user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing
  %20user-read-email%20user-read-private%20app-remote-control%20streaming
  `,
    "_self",
    "resizable=yes,top=500,left=500,width=400,height=400"
  );
};

export const getUserInfo = async (code) => {
  const { clientID, clientSecret } = config.auth;
  const auth_token = btoa(`${clientID}:${clientSecret}`);
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      authorization: "Basic " + auth_token,
      accept: "application/json",
    },
    body: `grant_type=authorization_code&code=${code}&redirect_uri=http://127.0.0.1:3000/login`,
  });
  let token = "";
  await response.json().then((res) => {
    token = res.access_token;
  });
  const profile = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await profile.json();
  const finalUserData = {
    id: data.id,
    country: data.country,
    name: data.display_name,
    email: data.email,
    product: data.product,
    ratedPlaylist: [],
  };
  addUser(finalUserData);
  return finalUserData;
};

export const getPlaylistData = async (playlistID) => {
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
  console.log(finalisedData);
  return finalisedData;
};

export const addNewPlaylist = async (playlistID) => {
  const data = await getPlaylistData(playlistID);
  addPlaylist(data);
};

export const updatePlaylistData = async (playlistID) => {
  const data = await getPlaylistData(playlistID);
  updatePlaylist(data);
};
