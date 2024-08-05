export const uploadToIPFS = async (file) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  
    let data = new FormData();
    data.append('file', file);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        },
        body: data
      });
  
      const result = await response.json();
      if (response.ok) {
        const ipfsUri = `ipfs://${result.IpfsHash}`;
        console.log(`Successfully uploaded to IPFS. URI: ${ipfsUri}`);
        return `https://peach-urban-swan-906.mypinata.cloud/ipfs/${result.IpfsHash}`;
      } else {
        throw new Error(`Failed to upload to IPFS: ${JSON.stringify(result)}`);
      }
    } catch (error) {
      console.error(`Error uploading file to IPFS: ${error}`);
      return null;
    }
};
