import React, { useState, useEffect } from 'react';

const WalletConnect = () => {
    const [userAddress, setUserAddress] = useState('');
    const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

    useEffect(() => {
        setIsMetaMaskInstalled(!!window.ethereum && window.ethereum.isMetaMask);
        
        // Move the event listener setup inside the useEffect and check if ethereum exists
        if(window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length > 0) {
                    console.log('Account changed', accounts[0]);
                    setUserAddress(accounts[0]);
                } else {
                    // Handle case where user disconnects wallet
                    setUserAddress('');
                }
            });
        }
    }, []);

    const connectWalletHandler = async () => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            console.log('MetaMask Here!');

            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                console.log('Connected', accounts[0]);
                setUserAddress(accounts[0]);
            } catch (error) {
                console.error(error);
            }

        } else {
            console.log('MetaMask is not installed.');
            // Prompt the user to install MetaMask or handle the error
        }
    };

    return (
        <div>
            {isMetaMaskInstalled ? (
                userAddress ? (
                    <p>Connected as {userAddress}</p>
                ) : (
                    <button onClick={connectWalletHandler}>Connect Wallet</button>
                )
            ) : (
                <p>Please install MetaMask to use this app.</p>
            )}
        </div>
    );
};

export default WalletConnect;
