import logo from './logo.svg';
import './App.css';
import React from 'react';
import WalletConnect from './WalletConnect';
import MintNFTForm from './MintNFTForm';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { signOut } from '@aws-amplify/auth';


function App() {
  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <WalletConnect />
        <MintNFTForm />
        <button onClick={handleLogout}>Logout</button>
        <a
          className="App-link"
          href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Install MetaMask
        </a>
      </header>
    </div>
  );
}


export default withAuthenticator(App);
