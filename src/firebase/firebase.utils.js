import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/analytics";

import { firebaseConfig } from "./firebase.config";

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();

const addPlaylist = async (playlistData) => {
  const playlistRef = await db.collection("playlists");
  const playlist = playlistRef.doc(playlistData.id);
  if (!(await playlist.get()).exists)
    playlist.set({
      ...playlistData,
      addedAt: firebase.firestore.FieldValue.serverTimestamp(),
      rating: 0,
    });
};

const updatePlaylist = async (playlistData) => {
  const playlistRef = await db.collection("playlists");
  const playlist = playlistRef.doc(playlistData.id);
  playlist.update(playlistData).catch((err) => {
    console.log("error.");
  });
};

const retrievePlaylist = async (orderField = "") => {
  const playlistRef =
    orderField.length > 0
      ? await db.collection("playlists").orderBy(orderField)
      : await db.collection("playlists");
  const playlists = await playlistRef.get();
  return playlists.docs;
};

const ratePlaylist = async (playlistID) => {
  const playlistRef = await db.doc(`playlists/${playlistID}`);
  await playlistRef.update({
    rating: (await playlistRef.get()).data().rating + 1,
  });
};

const addUserRated = async (currentUser, playlistID) => {
  const userRef = await db.doc(`users/${currentUser.id}`);
  await userRef.update({
    ratedPlaylist: firebase.firestore.FieldValue.arrayUnion(playlistID),
  });
};

const addUser = async (finalUserData) => {
  const userRef = await db.doc(`users/${finalUserData.id}`);
  const get = await userRef.get();
  if (!get.exists) userRef.set(finalUserData);
};

const getUserData = async (user) => {
  const userRef = await db.doc(`users/${user.id}`);
  const get = await userRef.get();
  if (get.exists) return await get.data();
};

export {
  addPlaylist,
  updatePlaylist,
  retrievePlaylist,
  ratePlaylist,
  addUserRated,
  addUser,
  getUserData,
};
