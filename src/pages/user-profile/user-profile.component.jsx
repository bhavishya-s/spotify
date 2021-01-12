import React, { useState, useEffect } from "react";
import Spinner from "../../components/spinner/spinner.component";
import { getUserData } from "../../firebase/firebase.utils";

import "./user-profile.styles.scss";

const UserProfilePage = ({ match }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUserProfile(match.params.userID).then((res) => setUser(res));
  });

  return user ?? null ? (
    <>
      <div className="user-data-section section">
        <div className="user-profile-picture-container"></div>
        <div className="user-details-container">
          <span className="user-name">{user.name}</span>
        </div>
      </div>

      <div className="user-rated-playlist-section section">
        <div className="section-title">User Rated</div>
        <div className="user-rated-playlists-container"></div>
      </div>
    </>
  ) : (
    <Spinner />
  );
};

const getUserProfile = async (userID) => {
  const user = await getUserData({ id: userID });
  return user;
};

export default UserProfilePage;
