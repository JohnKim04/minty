import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import MyNFTContractABI from './abis/MyNFTAbi.json'; // The ABI for your contract

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const useContract = () => {
    const [contract, setContract] = useState(null);

    useEffect(() => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const nftContract = new ethers.Contract(contractAddress, MyNFTContractABI, signer);
            
            setContract(nftContract);
        } else {
            console.error("Ethereum object doesn't exist!");
        }
    }, []);

    // Define the mintNFT function within the hook
    const mintNFT = useCallback(async (tokenURI) => {
        if (!contract) return;

        try {
            // Assuming the current user is the owner and the recipient of the NFT
            const signerAddress = await contract.signer.getAddress();
            const mintTx = await contract.safeMint(signerAddress, tokenURI);
            await mintTx.wait(); // Wait for transaction to be mined
            console.log("NFT Minted!");
        } catch (error) {
            console.error("Minting failed", error);
        }
    }, [contract]);

    // Return both the contract instance and the mintNFT function
    return { contract, mintNFT };
};

export default useContract;
