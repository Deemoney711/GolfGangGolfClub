const { Connection, clusterApiUrl } = require('@solana/web3.js');

// Use devnet for testing
const connection = new Connection(clusterApiUrl('devnet'));

module.exports = { connection };