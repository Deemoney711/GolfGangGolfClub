const { Token, TOKEN_PROGRAM_ID } = require('@solana/spl-token');
const { PublicKey, Keypair } = require('@solana/web3.js');
const { connection } = require('./config');

// Function to create a new token (to be called once by admin)
async function createToken(adminKeypair) {
  try {
    const mint = await Token.createMint(
      connection,
      adminKeypair,
      adminKeypair.publicKey,
      adminKeypair.publicKey,
      9, // 9 decimals like SOL
      TOKEN_PROGRAM_ID
    );
    
    console.log("Token created with address:", mint.publicKey.toString());
    return mint.publicKey.toString();
  } catch (error) {
    console.error("Error creating token:", error);
    throw error;
  }
}

module.exports = { createToken };