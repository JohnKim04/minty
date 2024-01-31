export const uploadToIPFS = async (file) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  
    let data = new FormData();
    data.append('file', file);
  
    // Assuming the 'pinataSecretApiKey' is actually a JWT
    const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhYTNjZGUzYy0yZjQ2LTQ5MGMtOGQwNy1kYTRmYzM1ZGRiNzkiLCJlbWFpbCI6ImpvaG4ubS5raW04OTBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImQ3MGMxMDRmOGIwMmM5NGJjOWE5Iiwic2NvcGVkS2V5U2VjcmV0IjoiOTBlMmJkNWNiMzQxNjMwNGVjOTBlNzU5YzE0NDlkZWVlYWU0MjVjYmE3NzRhOThhYWY2YmIxY2M0Mzk0MTNhNSIsImlhdCI6MTcwNjY3NjI3M30.HehNt08S7LEfE5ghe0bmb_FH65RU6BjnTCmAhfs4Jvw'; // Use the JWT token here
  
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
        return `https://peach-urban-swan-906.mypinata.cloud/ipfs/${result.IpfsHash}`;
      } else {
        throw new Error(`Failed to upload to IPFS: ${JSON.stringify(result)}`);
      }
    } catch (error) {
      console.error(`Error uploading file to IPFS: ${error}`);
      return null;
    }
};
