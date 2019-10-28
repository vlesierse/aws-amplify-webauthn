import React, { useState } from "react";
import { Auth } from "aws-amplify";

import { preformatMakeCredReq, preformatGetAssertReq, publicKeyCredentialToJSON } from "./WebAuthn/utils";

export default ({ changeAuthState }) => {
  const [ email, setEmail] = useState('');

  const handleSignInClick = async () => {
    const cognitoUser = await Auth.signIn(email);
    if (cognitoUser.challengeName === 'CUSTOM_CHALLENGE' && cognitoUser.challengeParam) {
      const credentialRequest = JSON.parse(decodeURI(cognitoUser.challengeParam.challenge));
      console.log(credentialRequest);
      const credentialAction = (req, type) => type === 'CREATE' ? navigator.credentials.create({ publicKey: preformatMakeCredReq(req)}) : navigator.credentials.get({ publicKey: preformatGetAssertReq(req)});
      const response = await credentialAction(credentialRequest, cognitoUser.challengeParam.challengeType);
      console.log(response);
      const user = await Auth.sendCustomChallengeAnswer(cognitoUser, encodeURI(JSON.stringify(publicKeyCredentialToJSON(response))));
      console.log(user);
    }
  }

  return (
    <div>
      <h1>Sign In</h1>
      <div>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleSignInClick}>Sign In</button>
        <button onClick={() => changeAuthState("signup")}>Sign Up</button>
      </div>
    </div>
  )
};
