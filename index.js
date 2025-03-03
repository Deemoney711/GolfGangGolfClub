const { checkMembership } = require('./nft');
const { createToken } = require('./token');

// Your actual Golfgang collection address
const golfgangCollection = "175348331c7bf1aca8ef809f8a25b09de6d8333cee03a369dc83f4da5c104c65";

// Example usage
async function main() {
  // This would come from the connected wallet in the frontend
  const walletToCheck = "WALLET_ADDRESS_TO_TEST";
  
  const isMember = await checkMembership(walletToCheck, golfgangCollection);
  console.log(`Is wallet a member? ${isMember}`);
}

// Uncomment to run the main function
// main();

console.log("Golfgang NFT Membership App initialized!");