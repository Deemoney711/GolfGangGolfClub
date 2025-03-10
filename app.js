document.addEventListener('DOMContentLoaded', () => {
    // Your actual Golfgang collection address
    const golfgangCollection = "175348331c7bf1aca8ef809f8a25b09de6d8333cee03a369dc83f4da5c104c65";
    
    // Elements
    const connectButton = document.getElementById('connectButton');
    const disconnectButton = document.getElementById('disconnectButton');
    const walletInfo = document.getElementById('walletInfo');
    const membershipStatus = document.getElementById('membershipStatus');
    const exclusiveContent = document.getElementById('exclusiveContent');
    
    // Initially hide exclusive content
    exclusiveContent.style.display = 'none';
    
    // Check if Phantom is available
    const isPhantomInstalled = window.solana && window.solana.isPhantom;
    
    if (!isPhantomInstalled) {
      connectButton.disabled = true;
      connectButton.textContent = 'Phantom wallet not installed';
      walletInfo.textContent = 'Please install Phantom wallet to use this app: https://phantom.app/';
      return;
    }
    
    // Connect to wallet
    connectButton.addEventListener('click', async () => {
      try {
        connectButton.disabled = true;
        connectButton.textContent = 'Connecting...';
        
        // Connect to Phantom
        const resp = await window.solana.connect();
        const walletAddress = resp.publicKey.toString();
        
        walletInfo.textContent = `Connected: ${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`;
        connectButton.textContent = 'Wallet Connected';
        
        // Show disconnect button
        disconnectButton.style.display = 'inline-block';
        
        // Check membership
        membershipStatus.textContent = 'Checking membership status...';
        
        // In a real app, this would call your backend to verify NFT ownership
        // For demo purposes, we'll simulate the check
        await checkMembership(walletAddress);
        
      } catch (error) {
        console.error(error);
        walletInfo.textContent = 'Connection failed: ' + error.message;
        connectButton.disabled = false;
        connectButton.textContent = 'Connect Wallet';
      }
    });
    
    // Disconnect from wallet
    disconnectButton.addEventListener('click', async () => {
      try {
        // Disconnect from Phantom
        await window.solana.disconnect();
        
        // Update UI
        connectButton.disabled = false;
        connectButton.textContent = 'Connect Wallet';
        disconnectButton.style.display = 'none';
        walletInfo.textContent = 'Wallet disconnected';
        membershipStatus.textContent = 'Connect wallet to check membership';
        membershipStatus.style.color = '';
        exclusiveContent.style.display = 'none';
        
      } catch (error) {
        console.error(error);
        walletInfo.textContent = 'Disconnection failed: ' + error.message;
      }
    });
    
    // Simulate membership check - in a real app this would verify against the blockchain
    async function checkMembership(walletAddress) {
      // Simulate blockchain verification delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In this demo we'll approve all wallets - in your real app this would
      // check the blockchain for NFT ownership using your collection address
      const isMember = true; // For demo purposes
      
      if (isMember) {
        membershipStatus.textContent = 'Membership verified! Welcome, Golfgang member.';
        membershipStatus.style.color = 'green';
        exclusiveContent.style.display = 'block';
      } else {
        membershipStatus.textContent = 'No membership NFT found. Purchase one to access exclusive content.';
        membershipStatus.style.color = 'red';
        exclusiveContent.style.display = 'none';
      }
    }
  });
