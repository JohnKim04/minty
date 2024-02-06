import React, { useState } from 'react';
import useContract from './useContract'; 
import { uploadToIPFS } from './ipfsClient';

const MintNFTForm = () => {
    const { mintNFT } = useContract();
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            console.log("File selected:", event.target.files[0].name); // Log the name of the file
            setFile(event.target.files[0]);
        } else {
            console.log("No file selected.");
            setFile(null);
        }
    };

    const handleMint = async () => {
        if (!file) {
            console.log("No file to upload. Please select a file.");
            alert("Please select a file first.");
            return;
        }

        console.log("Starting IPFS upload...");
        const url = await uploadToIPFS(file);
        if (url) {
            console.log("Successfully uploaded to IPFS:", url);
            console.log("Minting NFT with the uploaded file...");
            await mintNFT(url);
            console.log("NFT minting process completed.");
        } else {
            console.log("Failed to upload to IPFS.");
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleMint} disabled={!file}>Mint NFT</button>
        </div>
    );
};

export default MintNFTForm;
