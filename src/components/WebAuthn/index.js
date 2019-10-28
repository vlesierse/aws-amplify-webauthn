import React, { useContext, createContext, useReducer } from "react";
import * as utils from './utils';

const initialState = {};
const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
const initializer = initialState => {
  return initialState;
};

export const WebAuthnContext = createContext();
export const useWebAuthn = () => useContext(WebAuthnContext);
export const WebAuthnProvider = ({ children }) => {
  const { state, dispatch } = useReducer(reducer, initialState, initializer);

  const actions = {
    authenticate: async challenge => {
      const assertion = await navigator.credentials.get({
        publicKey: { challenge: challenge }
      });
    },
    register: async (username, name) => {
      try {
        const response = await fetch("http://localhost:3000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name: name, username: username })
        });
        const responseData = await response.json();
        const credentialRequest = utils.preformatMakeCredReq(responseData);
        const credential = await navigator.credentials.create({ publicKey: credentialRequest });
        console.log(credential);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <WebAuthnContext.Provider value={{ state, ...actions }}>
      {children}
    </WebAuthnContext.Provider>
  );
};
