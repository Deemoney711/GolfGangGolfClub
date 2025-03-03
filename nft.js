const { Metaplex } = require('@metaplex-foundation/js');
const { PublicKey, Keypair } = require('@solana/web3.js');
const { connection } = require('./config');

// Initialize Metaplex
const metaplex = Metaplex.make(connection);

// Function to check if a wallet owns the membership NFT
async function checkMembership(walletAddress, collectionAddress) {
  try {
    const publicKey = new PublicKey(walletAddress);
    const nfts = await metaplex.nfts().findAllByOwner({ owner: publicKey });
    
    // Check if any NFT belongs to the Golfgang collection
    return nfts.some(nft => 
      nft.collection?.address.toString() === collectionAddress
    );
  } catch (error) {
    console.error("Error checking membership:", error);
    return false;
  }
}

module.exports = { checkMembership };