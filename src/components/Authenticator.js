import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default ({ children, onAuthStateChange }) => {
  const [authState, setAuthState] = useState("signin");
  const [user, setUser] = useState(null);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        setUser(user);
        setAuthState("signedin");
      })
      .catch(() => setUser(null));
  }, []);

  const changeAuthState = (authState, authData) => {
    setAuthState(authState);
    if (onAuthStateChange) onAuthStateChange(authState, authData);
  };

  const renderComponent = authState => {
    switch(authState) {
      case 'signin':
        return <SignIn changeAuthState={changeAuthState} />
      case 'signup':
        return <SignUp changeAuthState={changeAuthState} />
      default:
        console.log('Unknown state');
    }
  };

  return <div>{authState === "signedin" ? children : renderComponent(authState)}</div>;
};
