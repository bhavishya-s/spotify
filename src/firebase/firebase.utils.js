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

const addUser = async (finalUserData) => {
  const userRef = await db.doc(`users/${finalUserData.id}`);
  const get = await userRef.get();
  if (!get.exists) userRef.set(finalUserData);
};
export { addPlaylist, retrievePlaylist, ratePlaylist, addUser };
