import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { Auth } from "aws-amplify"; // or 'aws-amplify-react-native';
import { useWebAuthn } from "./components/WebAuthn";
import Authenticator from "./components/Authenticator";

Amplify.configure(awsconfig);

function App() {
  return (
    <Authenticator>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button onClick={() => Auth.signOut()}>Sign Out</button>
        </header>
      </div>
    </Authenticator>
  );
}

export default App;
