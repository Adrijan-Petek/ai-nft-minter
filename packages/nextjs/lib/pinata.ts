export const pinJSONToIPFS = async (json: any) => {
  const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.PINATA_JWT}`
    },
    body: JSON.stringify(json)
  });

  if (!response.ok) {
    throw new Error(`Pinata API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.IpfsHash;
};