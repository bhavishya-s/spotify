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

const retrievePlaylist = async () => {
  const playlistRef = await db.collection("playlists").limit(5);
  const playlists = await playlistRef.get();
  return playlists.docs;
};

export { addPlaylist, retrievePlaylist };
