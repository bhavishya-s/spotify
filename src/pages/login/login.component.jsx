import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";

import Spinner from "../../components/spinner/spinner.component";

import { getUserInfo } from "../../spotify/spotify.utils";
import { getUserData } from "../../firebase/firebase.utils";
const LoginPage = (props) => {
  const [user, setUser] = useState({});
  const code = new URLSearchParams(props.location.search).get("code");
  const setUserState = async () => {
    if (code) {
      const userData = await getUserInfo(code);
      const u = await getUserData(userData);
      setUser(u);
      props.setCurrentUser(u);
      props.history.push("/");
    } else {
      console.log(new URLSearchParams(props.location.search).get("error"));
    }
  };
  useEffect(() => {
    setUserState();
  });
  return Object.keys(user).length === 0 ? (
    <Spinner />
  ) : (
    <div>Redirecting...</div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(LoginPage);
