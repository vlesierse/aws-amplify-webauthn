import React, { useState } from "react";
import { Auth } from "aws-amplify";

function generatePassword(bytes) {
  const randomValues = new Uint8Array(bytes);
  window.crypto.getRandomValues(randomValues);
  return Array.from(randomValues)
    .map(nr => nr.toString(16).padStart(2, "0"))
    .join("");
}

export default ({ changeAuthState }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSignUpClick = async () => {
    const result = await Auth.signUp({
      username: email,
      password: generatePassword(30),
      attributes: {
        name: name
      }
    });
    changeAuthState('signin');
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleSignUpClick}>Sign Up</button>
      </div>
    </div>
  );
};
